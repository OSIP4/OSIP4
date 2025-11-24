import { useEffect, useState, useMemo } from "react";
import axios from "axios";

export default function JadwalApelPage({ user }) {
  const [jadwal, setJadwal] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // State form tambah
  const [newHari, setNewHari] = useState("");
  const [newTanggal, setNewTanggal] = useState("");
  const [newKelas, setNewKelas] = useState("");

  const API = "https://bayudian.pplgsmkn4.my.id/lomba_api/src/api/";

  // Load SEMUA JADWAL tanpa filter tanggal
  const loadJadwal = () => {
    axios
      .get(API + "get_jadwal.php")
      .then((res) => {
        setJadwal(res.data);
      })
      .catch((err) => console.error("Gagal memuat jadwal:", err));
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
        item.Tanggal.toLowerCase().includes(term)
    );
  }, [jadwal, searchTerm]);

  const openModal = (item, e) => {
    setSelectedJadwal(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJadwal(null);
  };

  // -----------------------------
  //   Hapus Jadwal
  // -----------------------------
  const deleteJadwal = async () => {
    if (!selectedJadwal) return;

    if (!confirm("Yakin ingin menghapus jadwal ini?")) return;

    try {
      await axios.get(
        API + `delete_jadwal.php?id_jadwal=${selectedJadwal.id_jadwal}`
      );
      closeModal();
      loadJadwal();
    } catch (err) {
      alert("Gagal menghapus jadwal!");
      console.error(err);
    }
  };

  // -----------------------------
  //   Tambah Jadwal
  // -----------------------------
  const addJadwal = async () => {
    if (!newHari || !newTanggal || !newKelas)
      return alert("Harap isi semua field!");

    try {
      await axios.post(API + "add_jadwal.php", {
        Hari: newHari,
        Tanggal: newTanggal,
        Kelas: newKelas,
      });

      setIsAddModalOpen(false);
      setNewHari("");
      setNewTanggal("");
      setNewKelas("");
      loadJadwal();
    } catch (err) {
      alert("Gagal menambah jadwal!");
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Efek cahaya mouse */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      <div className="relative z-10 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Jadwal Apel</h2>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium"
          >
            + Tambah Jadwal
          </button>
        </div>

        <p className="text-gray-400 text-sm mb-6">
          Menampilkan semua jadwal apel.
        </p>

        {/* Input Pencarian */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari jadwal..."
              className="w-full p-3 pl-10 pr-4 rounded-lg bg-slate-900/60 border border-slate-800 text-white"
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

        {/* Daftar Jadwal */}
        <div className="space-y-4">
          {filteredJadwal.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Tidak ada jadwal.
            </div>
          ) : (
            filteredJadwal.map((row) => (
              <div
                key={row.id_jadwal}
                onClick={(e) => openModal(row, e)}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 cursor-pointer hover:bg-slate-800/70 transition"
              >
                <div className="font-semibold text-lg">{row.Hari}</div>
                <div className="text-sm text-gray-300">
                  {row.Tanggal} •{" "}
                  <span className="text-blue-300">{row.Kelas}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Detail */}
      {isModalOpen && selectedJadwal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Detail Jadwal</h3>

            <div className="space-y-2 text-gray-300">
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

            <div className="mt-6 flex justify-end">
              <button
                onClick={deleteJadwal}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 p-4"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">Tambah Jadwal</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Hari"
                value={newHari}
                onChange={(e) => setNewHari(e.target.value)}
                className="w-full p-3 bg-slate-800 rounded-lg"
              />

              <input
                type="date"
                value={newTanggal}
                onChange={(e) => setNewTanggal(e.target.value)}
                className="w-full p-3 bg-slate-800 rounded-lg"
              />

              <input
                type="text"
                placeholder="Kelas"
                value={newKelas}
                onChange={(e) => setNewKelas(e.target.value)}
                className="w-full p-3 bg-slate-800 rounded-lg"
              />

              <button
                onClick={addJadwal}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
