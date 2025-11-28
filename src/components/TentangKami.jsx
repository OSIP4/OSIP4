import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

export default function TentangKami() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050B1A] text-white px-4 sm:px-6 md:px-8 py-16 sm:py-20">
      {/* Judul */}
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 tracking-wide"
        data-aos="fade-up"
      >
        OSIS SMKN 4 PADALARANG
      </h1>

      {/* Logo OSIS */}
      <div
        className="flex justify-center mb-10 sm:mb-12"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div className="relative">
          {/* Glow belakang (responsif) */}
          <div className="absolute inset-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-500 blur-[100px] opacity-40 rounded-full"></div>

          {/* Logo */}
          <img
            src="/logo.png"
            alt="Logo OSIS"
            className="relative w-48 sm:w-60 md:w-80 drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Deskripsi */}
      <div
        className="max-w-4xl mx-auto text-center text-base sm:text-lg md:text-xl leading-relaxed text-gray-300 px-2"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <p className="mb-4">
          OSIS (Organisasi Siswa Intra Sekolah) SMKN 4 berfungsi sebagai wadah
          bagi seluruh siswa untuk mengembangkan diri, menyalurkan kreativitas,
          serta meningkatkan kemampuan kepemimpinan.
        </p>

        <p className="mb-4">
          OSIS juga menjadi penghubung antara siswa dan pihak sekolah melalui
          berbagai program kerja yang disusun secara terstruktur dan
          berkelanjutan.
        </p>

        <p>
          Dengan adanya OSIS, diharapkan tercipta lingkungan sekolah yang aktif,
          harmonis, dan berprestasi baik dalam bidang akademik maupun
          non-akademik.
        </p>
      </div>
    </div>
  );
}
