import BeritaCard from "../components/BeritaCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BeritaPage({ user }) {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    pembuat: "",
    judul: "",
    deskripsi: "",
    isi: "",
    foto: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const API_BASE = "http://kompetisi.pplgsmkn4.my.id/Kompetisi/api";

  const loadBerita = async () => {
    try {
      const res = await axios.get(`${API_BASE}/get_berita.php`);
      setBeritaList(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Gagal memuat berita:", err);
      setBeritaList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBerita();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, foto: file }));
  };

  const handleTambah = async (e) => {
    e.preventDefault();
    const { pembuat, judul, deskripsi, isi } = form;

    if (!pembuat.trim() || !judul.trim() || !deskripsi.trim() || !isi.trim()) {
      toast.error("Pembuat, judul, deskripsi, dan isi wajib diisi!");
      return;
    }

    if (!user || user.role !== "admin") {
      toast.warn("Hanya admin yang bisa menambah berita!");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("pembuat", pembuat.trim());
      formData.append("judul", judul.trim());
      formData.append("deskripsi", deskripsi.trim());
      formData.append("isi", isi.trim());
      formData.append("id_user", user.id_user);
      if (form.foto) formData.append("foto", form.foto);

      await axios.post(`${API_BASE}/add_berita.php`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Berita berhasil ditambahkan!");
      setForm({ pembuat: "", judul: "", deskripsi: "", isi: "", foto: null });
      setShowForm(false);
      loadBerita();
    } catch (err) {
      console.error("Error:", err);
      toast.error("Gagal menambah berita.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleHapusConfirmed = async (id) => {
    try {
      await axios.post(`${API_BASE}/delete_berita.php`, { id });
      toast.success("Berita berhasil dihapus.");
      loadBerita();
    } catch (err) {
      console.error("Error hapus:", err);
      toast.error("Gagal menghapus berita.");
    }
  };

  const handleHapus = (id) => {
    if (!user || user.role !== "admin") {
      toast.warn("Hanya admin yang bisa menghapus berita!");
      return;
    }

    const toastId = toast.warn("Yakin ingin menghapus berita ini?", {
      autoClose: false,
      closeOnClick: false,
      position: "top-center",
      style: {
        backgroundColor: "#0f172a",
        color: "#f1f5f9",
        border: "1px solid #334155",
        borderRadius: "12px",
        padding: "16px",
      },
    });

    setTimeout(() => {
      toast.update(toastId, {
        render: (
          <div className="flex flex-col w-full">
            <p className="text-sm mb-3 text-gray-300">
              Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => toast.dismiss(toastId)}
                className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition text-white"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  toast.dismiss(toastId);
                  handleHapusConfirmed(id);
                }}
                className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 rounded-lg transition text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        ),
        autoClose: false,
      });
    }, 100);
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-300 min-h-screen bg-[#0C112A] flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 mx-auto mb-3"></div>
          <p className="text-gray-400">Memuat berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 text-gray-300 min-h-screen bg-[#0C112A] pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-200 to-cyan-200 mb-3">
          Berita Terbaru
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Dapatkan informasi terkini seputar kegiatan, pengumuman, dan prestasi
          di lingkungan sekolah.
          <br className="hidden sm:block" />
          <span className="text-gray-500">
            Data diperbarui secara real-time oleh admin sekolah.
          </span>
        </p>

        {user?.role === "admin" && (
          <div className="mt-6">
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Tambah Berita
            </button>
          </div>
        )}
      </div>

      {/* Modal Form Tambah Berita */}
      {showForm && user?.role === "admin" && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0F2D] rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-white">
                  Tambah Berita Baru
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-white text-2xl font-bold"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleTambah} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Nama Pembuat <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="pembuat"
                    value={form.pembuat}
                    onChange={handleInputChange}
                    placeholder="Contoh: Bapak/Ibu Guru, OSIS, dll"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Judul <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="judul"
                    value={form.judul}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Deskripsi <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Isi Berita <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="isi"
                    value={form.isi}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Unggah Foto (opsional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  />
                  {form.foto && (
                    <p className="text-xs text-teal-400 mt-1">
                      File terpilih: {form.foto.name}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold disabled:opacity-60 transition-all"
                  >
                    {submitting ? "Menyimpan..." : "Simpan Berita"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Daftar Berita */}
      <div className="max-w-7xl mx-auto">
        {beritaList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Belum ada berita tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beritaList.map((item) => (
              <BeritaCard
                key={item.id_berita || item.id}
                data={item}
                onHapus={
                  user?.role === "admin"
                    ? () => handleHapus(item.id_berita || item.id)
                    : null
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
