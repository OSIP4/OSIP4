import { useEffect, useState, useMemo } from "react";
import axios from "axios";

export default function JadwalApel({ user }) {
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Form state
  const [newHari, setNewHari] = useState("");
  const [newTanggal, setNewTanggal] = useState("");
  const [newKelas, setNewKelas] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Gunakan HTTPS untuk hindari mixed content
  const API = "http://kompetisi.pplgsmkn4.my.id/Kompetisi/api/";

  const loadJadwal = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}get_apel.php`);
      setJadwal(res.data);
    } catch (err) {
      console.error("Gagal memuat jadwal apel:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    loadJadwal();
  }, []);

  const filteredJadwal = useMemo(() => {
    if (!searchTerm.trim()) return jadwal;
    const term = searchTerm.toLowerCase();
    return jadwal.filter(
      (item) =>
        item.Hari.toLowerCase().includes(term) ||
        item.Kelas.toLowerCase().includes(term) ||
        item.Tanggal.includes(term)
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

  const deleteJadwal = async () => {
    if (!selectedJadwal || !confirm("Yakin ingin menghapus jadwal ini?"))
      return;

    try {
      await axios.get(
        `${API}delete_jadwal.php?id_jadwal=${selectedJadwal.id_jadwal}`
      );
      closeModal();
      loadJadwal();
    } catch (err) {
      alert("Gagal menghapus jadwal apel!");
      console.error(err);
    }
  };

  const addJadwal = async (e) => {
    e.preventDefault();
    if (!newHari || !newTanggal || !newKelas) {
      alert("Semua field wajib diisi!");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}add_apel.php`, {
        Hari: newHari.trim(),
        Tanggal: newTanggal,
        Kelas: newKelas.trim(),
      });
      alert("✅ Jadwal apel berhasil ditambahkan!");
      setIsAddModalOpen(false);
      setNewHari("");
      setNewTanggal("");
      setNewKelas("");
      loadJadwal();
    } catch (err) {
      alert("❌ Gagal menambah jadwal. Cek koneksi atau data Anda.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Cek apakah user adalah admin dengan aman
  const isAdmin = user && user.role === "admin";

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Mouse glow effect */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2), transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Jadwal Apel</h1>
            <p className="text-gray-400 text-sm mt-1">
              Kelola jadwal apel harian di sekolah.
            </p>
          </div>

          {/* ✅ Aman: hanya tampilkan jika user adalah admin */}
          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition"
            >
              + Tambah Jadwal
            </button>
          )}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari berdasarkan hari, kelas, atau tanggal..."
              className="w-full p-3 pl-10 pr-4 rounded-lg bg-slate-900/60 border border-slate-800 text-white placeholder:text-gray-500"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Loading atau Daftar */}
        {loading ? (
          <div className="text-center py-10 text-gray-400">
            Memuat jadwal...
          </div>
        ) : filteredJadwal.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Tidak ada jadwal yang ditemukan.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJadwal.map((row) => (
              <div
                key={row.id_jadwal}
                onClick={() => openModal(row)}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 cursor-pointer hover:bg-slate-800/70 transition-all hover:shadow-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-white">{row.Hari}</h3>
                    <p className="text-sm text-gray-400 mt-1">{row.Tanggal}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm font-medium">
                    {row.Kelas}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Detail */}
      {isModalOpen && selectedJadwal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Detail Jadwal</h2>
            <div className="space-y-3 text-gray-300">
              <div>
                <span className="font-medium text-white">Hari:</span>{" "}
                {selectedJadwal.Hari}
              </div>
              <div>
                <span className="font-medium text-white">Tanggal:</span>{" "}
                {selectedJadwal.Tanggal}
              </div>
              <div>
                <span className="font-medium text-white">Kelas:</span>{" "}
                <span className="text-blue-300">{selectedJadwal.Kelas}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
              >
                Tutup
              </button>
              {/* ✅ Aman: hanya tampilkan tombol hapus untuk admin */}
              {isAdmin && (
                <button
                  onClick={deleteJadwal}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Tambah Jadwal Apel</h2>
            <form onSubmit={addJadwal} className="space-y-4">
              <input
                type="text"
                placeholder="Hari (e.g., Senin)"
                value={newHari}
                onChange={(e) => setNewHari(e.target.value)}
                className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 text-white"
                required
              />
              <input
                type="date"
                value={newTanggal}
                onChange={(e) => setNewTanggal(e.target.value)}
                className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 text-white"
                required
              />
              <input
                type="text"
                placeholder="Kelas (e.g., XII RPL 1)"
                value={newKelas}
                onChange={(e) => setNewKelas(e.target.value)}
                className="w-full p-3 bg-slate-800 rounded-lg border border-slate-700 text-white"
                required
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-70"
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
