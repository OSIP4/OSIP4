import { useEffect, useState } from "react";

export default function OurKabinet() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Data anggota kabinet
  const members = [
    {
      name: "Ketua OSIP4",
      position: "Ketua OSIP4",
      image: "/images/ketua.jpg", // Ganti dengan path gambar sesuai proyek Anda
      description:
        "Mewujudkan Himpunan Mahasiswa Teknik Informatika yang solid, inovatif, dan berdaya saing, serta menjadi wadah pengembangan diri bagi mahasiswa dalam aspek akademik maupun non-akademik secara berkelanjutan.",
    },
    {
      name: "Wakil Ketua OSIP4",
      position: "Wakil Ketua OSIP4",
      image: "/images/wakil-ketua.jpg", // Ganti dengan path gambar sesuai proyek Anda
      description:
        "Mendorong kolaborasi antar mahasiswa melalui penyelenggaraan kegiatan akademik, riset, dan pengembangan teknologi yang partisipatif. Memperkuat solidaritas dan kebersamaan melalui kegiatan sosial, keorganisasian, dan pengabdian masyarakat yang inklusif.",
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Efek cahaya mouse */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8 sm:gap-12">
        {/* Kolom Kiri - Judul */}
        <div className="lg:w-1/3 flex flex-col items-center lg:items-start space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Our Kabinet
          </h2>
          <div className="flex flex-col gap-2">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-xl sm:text-2xl shadow-lg">
              Vision
            </div>
            <div className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold text-xl sm:text-2xl shadow-lg">
              Mission
            </div>
          </div>
        </div>

        {/* Kolom Kanan - Kartu Anggota */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 hover:border-blue-400/30 transition-all duration-300 group"
            >
              <div className="relative mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover rounded-lg shadow-md group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {member.position}
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {member.name}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
