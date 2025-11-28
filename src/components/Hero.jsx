import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  // Inisialisasi AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const goToBerita = () => navigate("/berita");
  const goToTentang = () => navigate("/tentang-kami");

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background interaktif */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Elemen dekoratif blur */}
      <div className="absolute top-1/4 left-1/10 w-40 h-40 sm:w-60 sm:h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/10 w-48 h-48 sm:w-80 sm:h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Konten utama — diberi animasi AOS */}
      <div
        className="max-w-4xl mx-auto text-center relative z-10 space-y-6"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <span className="block">Organisasi Siswa</span>
          <span className="block text-blue-300 mt-2">Intrasekolah</span>
          <span className="block mt-4 text-white">SMKN 4 Padalarang</span>
        </h1>

        <p
          className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Dengan adanya website ini, kalian dapat memantau berbagai kegiatan
          OSIS SMKN 4 Padalarang, mulai dari acara yang akan datang hingga
          kegiatan yang sedang berlangsung. Selain itu, kalian juga dapat
          menemukan informasi penting seputar program dan jurusan di SMKN 4
          Padalarang.
        </p>

        {/* Tombol aksi */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <button
            onClick={goToBerita}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-sm sm:text-base transition-all duration-300"
          >
            Lihat Berita Terbaru
          </button>

          <button
            onClick={goToTentang}
            className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
          >
            Kenalan dengan OSIP4
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
