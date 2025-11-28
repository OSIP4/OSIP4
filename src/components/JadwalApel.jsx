import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function JadwalApel({ user }) {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newTanggal, setNewTanggal] = useState("");
  const [newKelas, setNewKelas] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const API = "http://kompetisi.pplgsmkn4.my.id/Kompetisi/api/";

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const isToday = (dateString) => {
    const today = new Date();
    const compare = new Date(dateString);
    return (
      today.getDate() === compare.getDate() &&
      today.getMonth() === compare.getMonth() &&
      today.getFullYear() === compare.getFullYear()
    );
  };

  const loadJadwal = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}get_apel.php`);
      const data = Array.isArray(res.data) ? res.data : [];
      const sorted = data.sort(
        (a, b) => new Date(a.Tanggal) - new Date(b.Tanggal)
      );
      setJadwal(sorted);
    } catch (err) {
      console.error("Gagal memuat jadwal:", err);
      setJadwal([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJadwal();
  }, []);

  const filteredJadwal = useMemo(() => {
    if (!searchTerm.trim()) return jadwal;
    const term = searchTerm.toLowerCase();
    return jadwal.filter(
      (item) =>
        item.Kelas.toLowerCase().includes(term) ||
        formatDate(item.Tanggal).toLowerCase().includes(term)
    );
  }, [jadwal, searchTerm]);

  const openModal = (item) => {
    setSelectedJadwal(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJadwal(null);
  };

  // Hapus jadwal (setelah konfirmasi toast)
  const deleteJadwalConfirmed = async () => {
    if (!selectedJadwal) return;
    try {
      await axios.get(
        `${API}delete_apel.php?id_apel=${selectedJadwal.id_apel}`
      );
      toast.success("Jadwal berhasil dihapus.");
      closeModal();
      loadJadwal();
    } catch (err) {
      console.error("Error hapus:", err);
      toast.error("Gagal menghapus jadwal.");
    }
  };

  const addJadwal = async (e) => {
    e.preventDefault();
    if (!newTanggal || !newKelas.trim()) {
      toast.error("Lengkapi data!");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}add_apel.php`, {
        Tanggal: newTanggal,
        Kelas: newKelas.trim(),
      });
      toast.success("✅ Jadwal berhasil ditambahkan!");
      setIsAddModalOpen(false);
      setNewTanggal("");
      setNewKelas("");
      loadJadwal();
    } catch (err) {
      console.error("Error tambah:", err);
      toast.error("❌ Gagal menambah jadwal.");
    } finally {
      setSubmitting(false);
    }
  };

  const isAdmin = user?.role === "admin";
  const isPublic = user?.role === "publik";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 p-4 sm:p-6 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-200 to-cyan-200 mb-3">
            Jadwal Petugas Apel
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Pantau jadwal bertugas kelas Anda sebagai petugas apel/upacara
            bendera.
            <br className="hidden sm:block" />
            <span className="text-gray-500">
              Data diperbarui secara real-time oleh admin sekolah.
            </span>
          </p>

          {isPublic && (
            <div className="mt-5 inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/60 rounded-xl px-4 py-2.5">
              <span className="text-blue-400 text-lg">👥</span>
              <div className="text-left">
                <div className="text-sm font-medium text-white">
                  Tampilan Siswa
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Hanya bisa melihat jadwal
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tombol Tambah (Admin) */}
        {isAdmin && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-600 text-white font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Tambah Jadwal
            </button>
          </div>
        )}

        {/* Pencarian */}
        <div className="mb-8 max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari kelas atau tanggal..."
            className="w-full p-3.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
          />
        </div>

        {/* Daftar Jadwal */}
        {loading ? (
          <div className="text-center py-12 text-gray-400">Memuat...</div>
        ) : filteredJadwal.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-gray-800/30 rounded-xl">
            Belum ada jadwal apel.
          </div>
        ) : (
          <div className="grid gap-5">
            {filteredJadwal.map((item) => (
              <div
                key={item.id_apel}
                onClick={() => openModal(item)}
                className={`bg-gray-800/60 backdrop-blur-sm border rounded-xl p-5 cursor-pointer transition-all duration-200 hover:bg-gray-800 ${
                  isToday(item.Tanggal)
                    ? "border-blue-500/60 bg-blue-900/10 ring-1 ring-blue-500/20"
                    : "border-gray-700 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-900/20"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-lg font-bold text-white">
                      {item.Kelas}
                    </div>
                    <div className="text-gray-400 mt-1.5 flex items-center gap-1.5 text-sm">
                      🎖️ Petugas Apel
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Tanggal</div>
                    <div className="text-lg font-bold mt-1 text-blue-400">
                      {formatDate(item.Tanggal)}
                    </div>
                    {isToday(item.Tanggal) && (
                      <div className="mt-1.5 inline-block bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">
                        Hari Ini
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Detail */}
      {isModalOpen && selectedJadwal && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md p-6 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-center mb-4 text-blue-400">
              Detail Jadwal
            </h2>
            <div className="space-y-4 text-gray-200">
              <div className="bg-gray-900/40 p-4 rounded-xl text-center">
                <div className="text-sm text-gray-400">Kelas Bertugas</div>
                <div className="text-xl font-bold text-white mt-1">
                  {selectedJadwal.Kelas}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400">Tanggal Lengkap</div>
                <div className="text-lg font-medium mt-1 text-blue-300">
                  {new Date(selectedJadwal.Tanggal).toLocaleDateString(
                    "id-ID",
                    {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2.5 rounded-lg border border-gray-600 hover:bg-gray-700 text-white font-medium transition"
              >
                Tutup
              </button>
              {isAdmin && (
                <button
                  onClick={deleteJadwalConfirmed}
                  className="px-4 py-2.5 bg-red-700 hover:bg-red-600 text-white font-medium rounded-lg transition"
                >
                  Hapus
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-md p-6 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-center mb-5 text-blue-400">
              Tambah Jadwal Apel
            </h2>
            <form onSubmit={addJadwal} className="space-y-4">
              <input
                type="date"
                value={newTanggal}
                onChange={(e) => setNewTanggal(e.target.value)}
                className="w-full p-3.5 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-600/40"
                required
              />
              <input
                type="text"
                placeholder="Contoh: XII RPL 1"
                value={newKelas}
                onChange={(e) => setNewKelas(e.target.value)}
                className="w-full p-3.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/40"
                required
              />
              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-600 hover:bg-gray-700 text-white font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 bg-blue-800 hover:bg-blue-700 text-white font-medium rounded-xl disabled:opacity-70 transition"
                >
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
