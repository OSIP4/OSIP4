import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Efek Mouse */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Blur Circle Dekoratif */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Konten Utama - Centered */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Judul */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-white">
          <span className="block">Organisasi Siswa </span>
          <span className="block text-blue-300">Intrasekolah</span>
          <span className="block mt-4 text-white">SMKN 4 Padalarang</span>
        </h1>

        {/* Deskripsi */}
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
          Dengan adanya website ini, kalian dapat memantau berbagai kegiatan
          OSIS SMKN 4 Padalarang, mulai dari acara yang akan datang hingga
          kegiatan yang sedang berlangsung. Selain itu, kalian juga dapat
          menemukan informasi penting seputar program dan jurusan di SMKN 4
          Padalarang, termasuk peminatan serta informasi lainnya yang bermanfaat
          bagi siswa.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center space-x-2">
            <span>Lihat Berita Terbaru</span>
          </button>

          <button className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 flex items-center justify-center space-x-2">
            <span>Kenalan dengan OSIP4</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
