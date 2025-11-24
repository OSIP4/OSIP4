export default function TentangKami() {
  return (
    <div className="min-h-screen bg-[#050B1A] text-white px-6 pt-28 pb-20">
      
      {/* Judul */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 tracking-wide">
        OSIS SMKN 4 PADALARANG
      </h1>

      {/* Logo OSIS */}
      <div className="flex justify-center mb-12">
        <div className="relative">
          {/* Glow belakang */}
          <div className="absolute inset-0 w-[350px] h-[350px] bg-blue-500 blur-[120px] opacity-40 rounded-full"></div>

          {/* Logo */}
          <img
            src="/logo.png" // ganti gambar sesuai file kamu
            alt="Logo OSIS"
            className="relative w-[260px] md:w-[320px] drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Deskripsi */}
      <div className="max-w-4xl mx-auto text-center text-lg leading-relaxed text-gray-300">
        <p className="mb-4">
          OSIS (Organisasi Siswa Intra Sekolah) SMKN 4 berfungsi sebagai wadah 
          bagi seluruh siswa untuk mengembangkan diri, menyalurkan kreativitas, 
          serta meningkatkan kemampuan kepemimpinan.
        </p>

        <p className="mb-4">
          OSIS juga menjadi penghubung antara siswa dan pihak sekolah melalui 
          berbagai program kerja yang disusun secara terstruktur dan berkelanjutan.
        </p>

        <p>
          Dengan adanya OSIS, diharapkan tercipta lingkungan sekolah yang aktif, 
          harmonis, dan berprestasi baik dalam bidang akademik maupun non-akademik.
        </p>
      </div>

      {/* Garis bawah */}
      <div className="mt-14 flex justify-center">
        <div className="w-full max-w-5xl h-2 bg-blue-500 rounded-full opacity-80"></div>
      </div>
    </div>
  );
}
