// src/pages/BeritaPage.jsx
import BeritaCard from "../components/BeritaCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BeritaPage({ user }) {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    pembuat: "", // ✅ Input manual
    judul: "",
    deskripsi: "",
    isi: "",
    foto: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const API_BASE = "https://kompetisi.pplgsmkn4.my.id/Kompetisi/api";

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
      alert("Pembuat, judul, deskripsi, dan isi wajib diisi!");
      return;
    }

    if (!user || user.role !== "admin") {
      alert("Hanya admin yang bisa menambah berita!");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("pembuat", pembuat.trim());
      formData.append("judul", judul.trim());
      formData.append("deskripsi", deskripsi.trim());
      formData.append("isi", isi.trim());
      formData.append("id_user", user.id_user); // tetap kirim id_user untuk referensi
      if (form.foto) {
        formData.append("foto", form.foto);
      }

      await axios.post(`${API_BASE}/add_berita.php`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Berita berhasil ditambahkan!");
      setForm({ pembuat: "", judul: "", deskripsi: "", isi: "", foto: null });
      setShowForm(false);
      loadBerita();
    } catch (err) {
      console.error("Error:", err);
      alert("Gagal menambah berita.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleHapus = async (id) => {
    if (!user || user.role !== "admin") {
      alert("Hanya admin yang bisa menghapus berita!");
      return;
    }
    if (!confirm("Yakin hapus berita ini?")) return;
    try {
      await axios.post(`${API_BASE}/delete_berita.php`, { id });
      loadBerita();
    } catch (err) {
      console.error("Error hapus:", err);
      alert("Gagal menghapus berita.");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-300 min-h-screen bg-[#0C112A]">
        <p>Memuat berita...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 text-gray-300 min-h-screen bg-[#0C112A]">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Berita Terbaru
        </h1>
        {user && user.role === "admin" && (
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Tambah Berita
          </button>
        )}
      </div>

      {/* ✅ MODAL FORM LENGKAP DENGAN INPUT PEMBUAT */}
      {showForm && user && user.role === "admin" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0A0F2D] rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">
                  Tambah Berita Baru
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleTambah} className="space-y-4">
                {/* Pembuat */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Nama Pembuat *
                  </label>
                  <input
                    type="text"
                    name="pembuat"
                    value={form.pembuat}
                    onChange={handleInputChange}
                    placeholder="Contoh: Bapak/Ibu Guru, OSIS, dll"
                    className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600"
                    required
                  />
                </div>

                {/* Judul */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Judul *
                  </label>
                  <input
                    type="text"
                    name="judul"
                    value={form.judul}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600"
                    required
                  />
                </div>

                {/* Deskripsi */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Deskripsi *
                  </label>
                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600"
                    required
                  />
                </div>

                {/* Isi */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Isi Berita *
                  </label>
                  <textarea
                    name="isi"
                    value={form.isi}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600"
                    required
                  />
                </div>

                {/* Foto Upload */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Unggah Foto (opsional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600"
                  />
                  {form.foto && (
                    <p className="text-xs text-gray-400 mt-1">
                      File terpilih: {form.foto.name}
                    </p>
                  )}
                </div>

                {/* Aksi */}
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
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
      {beritaList.length === 0 ? (
        <p className="text-gray-500">Tidak ada berita tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beritaList.map((item) => (
            <BeritaCard
              key={item.id_berita || item.id}
              data={item}
              onHapus={
                user && user.role === "admin"
                  ? () => handleHapus(item.id_berita || item.id)
                  : null
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
