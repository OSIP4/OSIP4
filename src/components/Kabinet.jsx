import { useEffect, useState } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Kabinet() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  // Efek interaktif berbasis posisi mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const members = [
    {
      name: "Ketua OSIP4",
      position: "Ketua OSIP4",
      image: "/ketua.jpeg",
      description:
        "Mewujudkan Himpunan Mahasiswa Teknik Informatika yang solid, inovatif, dan berdaya saing, serta menjadi wadah pengembangan diri bagi mahasiswa dalam aspek akademik maupun non-akademik secara berkelanjutan.",
    },
    {
      name: "Wakil Ketua OSIP4",
      position: "Wakil Ketua OSIP4",
      image: "/wakil.jpeg",
      description:
        "Mendorong kolaborasi antar mahasiswa melalui penyelenggaraan kegiatan akademik, riset, dan pengembangan teknologi yang partisipatif. Memperkuat solidaritas dan kebersamaan melalui kegiatan sosial, keorganisasian, dan pengabdian masyarakat yang inklusif.",
    },
  ];

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Background interaktif */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
        {/* Kolom kiri: Judul & Vision/Mission */}
        <div
          className="lg:col-span-1 flex flex-col items-center lg:items-start space-y-6"
          data-aos="fade-right"
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center lg:text-left"
            data-aos="fade-up"
          >
            Our Kabinet
          </h2>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3 w-full">
            <div
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-lg sm:text-xl shadow-md w-full sm:w-auto text-center"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              Vision
            </div>
            <div
              className="bg-gray-700 text-white px-4 py-2 rounded-lg font-bold text-lg sm:text-xl shadow-md w-full sm:w-auto text-center"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              Mission
            </div>
          </div>
        </div>

        {/* Kolom kanan: Anggota kabinet */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {members.map((member, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 sm:p-6 hover:border-blue-400/40 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
            >
              <div className="relative mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 sm:h-64 object-cover rounded-lg shadow-sm"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {member.position}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                {member.name}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
