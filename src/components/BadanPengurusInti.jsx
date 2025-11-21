export default function BadanPengurusInti() {
  // Data Divisi
  const divisions = [
    { name: "Pendidikan", id: "pendidikan" },
    { name: "Humas", id: "humas" },
    { name: "Sekretaris", id: "sekretaris" },
    { name: "Bendahara", id: "bendahara" },
    { name: "Media Kreatif", id: "media-kreatif" },
    { name: "Riset & Teknologi", id: "riset-teknologi" },
    { name: "PSDM", id: "psdm" },
  ];

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Konten Utama */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Judul Utama */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-white leading-tight">
          Badan Pengurus Inti
        </h2>

        {/* Grid Tombol Divisi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {divisions.map((division, index) => (
            <button
              key={index}
              className="group relative w-full p-4 sm:p-5 rounded-xl border border-white/30 bg-white/5 backdrop-blur-sm 
              hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-white text-base sm:text-lg font-medium 
              shadow-md hover:shadow-lg hover:scale-102"
            >
              {division.name}
            </button>
          ))}
        </div>

        {/* Teks Tambahan (Opsional) */}
        <div className="mt-10 sm:mt-12 text-gray-200 text-sm sm:text-base">
          Setiap divisi memiliki peran penting dalam menjalankan roda organisasi
          OSIP4.
        </div>
      </div>
    </section>
  );
}
