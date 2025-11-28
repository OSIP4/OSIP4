import { useEffect } from "react";

// ✅ Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

export default function BadanPengurusInti() {
  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const divisions = [
    { name: "Ketua Umum", id: "ketua-umum" },
    { name: "Wakil Ketua Umum", id: "wakil-ketua-umum" },
    { name: "Ketua Koordinator 1", id: "ketua-kordinator-1" },
    { name: "Ketua Koordinator 2", id: "ketua-kordinator-2" },
    { name: "Sekretaris Umum", id: "sekretaris-umum" },
    { name: "Sekretaris 1", id: "sekretaris-1" },
    { name: "Sekretaris 2", id: "sekretaris-2" },
    { name: "Bendahara Umum", id: "bendahara-umum" },
    { name: "Bendahara 1", id: "bendahara-1" },
    { name: "Bendahara 2", id: "bendahara-2" },
  ];

  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
          data-aos="fade-up"
        >
          Badan Pengurus Inti
        </h2>

        {/* Grid divisi responsif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {divisions.map((division, index) => (
            <button
              key={index}
              className="w-full p-4 sm:p-5 rounded-xl border border-white/30 bg-white/5 backdrop-blur-sm
                hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-white
                text-base sm:text-lg font-medium shadow hover:shadow-lg hover:scale-[1.02]"
              data-aos="fade-up"
              data-aos-delay={100 + index * 50} // animasi berurutan
            >
              {division.name}
            </button>
          ))}
        </div>

        <p
          className="mt-10 text-gray-300 text-sm sm:text-base"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          Setiap divisi memiliki peran penting dalam menjalankan roda organisasi
          OSIP4.
        </p>
      </div>
    </section>
  );
}
