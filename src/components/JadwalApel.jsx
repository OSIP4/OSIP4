import { useEffect, useState } from "react";
import axios from "axios";

export default function JadwalApelPage({ user }) {
  const [jadwal, setJadwal] = useState([]);
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickPosition, setClickPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const API = "https://bayudian.pplgsmkn4.my.id/lomba_api/src/api/";

  // Load jadwal
  const loadJadwal = () => {
    axios
      .get(API + "get_jadwal.php")
      .then((res) => setJadwal(res.data))
      .catch((err) => console.error("Gagal memuat jadwal:", err));
  };

  // Mouse tracking untuk efek cahaya
  useEffect(() => {
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    loadJadwal();
  }, []);

  const openModal = (item, e) => {
    const x = e.clientX;
    const y = e.clientY;
    setClickPosition({ x, y });
    setSelectedJadwal(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJadwal(null);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Efek cahaya mouse (sama seperti AppBackground) */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Blur Circle Dekoratif */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

      {/* Konten Utama */}
      <div className="relative z-10 p-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-2">
          Jadwal Apel
        </h2>

        {/* Daftar Jadwal */}
        <div className="space-y-4">
          {jadwal.length === 0 ? (
            <p className="text-gray-400">Tidak ada jadwal tersedia.</p>
          ) : (
            jadwal.map((row) => (
              <div
                key={row.id_jadwal}
                onClick={(e) => openModal(row, e)}
                className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-xl p-4 cursor-pointer 
                  hover:bg-slate-800/70 transition-all duration-300 hover:border-blue-500/30"
              >
                <div className="font-semibold text-lg text-white">
                  {row.Hari}
                </div>
                <div className="text-sm text-gray-300 mt-1">
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
          style={{
            background: `radial-gradient(600px circle at ${clickPosition.x}px ${clickPosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
          }}
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-white">Detail Jadwal</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl font-light"
                >
                  &times;
                </button>
              </div>

              <div className="mt-4 space-y-3 text-gray-300">
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

              {user && (
                <div className="mt-6 flex justify-end space-x-2">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition">
                    Hapus
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
