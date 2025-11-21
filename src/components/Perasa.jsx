import { useState } from "react";

export default function PesanRahasia() {
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    tahunAngkatan: "",
    jenisPesan: "",
    pesan: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama.trim() || !formData.pesan.trim()) {
      alert("Nama dan pesan wajib diisi!");
      return;
    }

    // Di sini Anda bisa kirim ke backend atau simpan ke localStorage
    console.log("Pesan dikirim:", formData);

    // Reset form
    setFormData({
      nama: "",
      telepon: "",
      tahunAngkatan: "",
      jenisPesan: "",
      pesan: "",
    });

    alert(
      "Terima kasih atas pesannya! Kami akan mempertimbangkan masukan Anda 😊"
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Efek cahaya mouse (sama seperti Hero) */}

      {/* Konten Utama - Centered */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 relative z-10">
        {/* Kolom Kiri - Form */}
        <div className="lg:w-1/2 w-full">
          <div className="bg-slate-900/50 p-6 sm:p-8 rounded-xl border border-slate-800">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">
              Pesan Rahasia
            </h2>

            <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              Hi Guys, Kalau kalian punya saran, kritik, masukkan, pertanyaan,
              atau apa pun kalian bisa isi form ini yaa... Btw, bahasanya yang
              sopan yaa 😊 Pesan ini tidak akan disebarluaskan dan akan kami
              gunakan untuk bahan pertimbangan dan evaluasi ke depannya.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nama"
                  className="block text-xs font-medium text-gray-400 mb-1"
                >
                  Nama kamu
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Nama kamu"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="telepon"
                  className="block text-xs font-medium text-gray-400 mb-1"
                >
                  Telepon kamu
                </label>
                <input
                  type="tel"
                  id="telepon"
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleChange}
                  placeholder="Telepon kamu"
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  * Masukan telepon jika memerlukan tanggapan kami
                </p>
              </div>

              <div>
                <label
                  htmlFor="tahunAngkatan"
                  className="block text-xs font-medium text-gray-400 mb-1"
                >
                  Pilih tahun angkatan
                </label>
                <select
                  id="tahunAngkatan"
                  name="tahunAngkatan"
                  value={formData.tahunAngkatan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Pilih Tahun --</option>
                  {[...Array(10)].map((_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label
                  htmlFor="jenisPesan"
                  className="block text-xs font-medium text-gray-400 mb-1"
                >
                  Pilih Jenis Pesan
                </label>
                <select
                  id="jenisPesan"
                  name="jenisPesan"
                  value={formData.jenisPesan}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Pilih Jenis --</option>
                  <option value="saran">Saran</option>
                  <option value="kritik">Kritik</option>
                  <option value="masukan">Masukan</option>
                  <option value="pertanyaan">Pertanyaan</option>
                  <option value="lainnya">Lainnya</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="pesan"
                  className="block text-xs font-medium text-gray-400 mb-1"
                >
                  Pesan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tulis pesanmu di sini..."
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg"
              >
                KIRIM PESAN
              </button>
            </form>
          </div>
        </div>

        {/* Kolom Kanan - Ilustrasi */}
        <div className="lg:w-1/2 w-full flex justify-center">
          {/* Ilustrasi placeholder — ganti dengan SVG atau gambar nyata */}
          <div className="relative w-full max-w-md">
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
              className="filter drop-shadow-lg"
            >
              {/* Latar belakang abstrak ungu */}
              <defs>
                <radialGradient id="purpleGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6B46C1" />
                  <stop offset="100%" stopColor="#2D3748" />
                </radialGradient>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#purpleGradient)"
                rx="20"
              />

              {/* Karakter ilustrasi */}
              <path
                d="M200,100 C150,150 150,250 200,300 C250,250 250,150 200,100 Z"
                fill="#4F46E5"
                stroke="#93C5FD"
                strokeWidth="2"
              />
              <circle cx="200" cy="180" r="10" fill="white" />
              <circle cx="220" cy="180" r="10" fill="white" />
              <path
                d="M180,220 Q200,240 220,220"
                stroke="white"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />

              {/* Balon obrolan */}
              <rect
                x="150"
                y="250"
                width="100"
                height="40"
                rx="10"
                fill="#3B82F6"
              />
              <polygon points="150,290 140,300 150,310" fill="#3B82F6" />

              {/* Kecil di bawah */}
              <circle cx="170" cy="340" r="8" fill="#60A5FA" />
              <circle cx="230" cy="340" r="8" fill="#60A5FA" />

              {/* Efek partikel kecil */}
              {[...Array(8)].map((_, i) => (
                <circle
                  key={i}
                  cx={180 + Math.sin(i * 0.8) * 30}
                  cy={120 + Math.cos(i * 0.8) * 30}
                  r="2"
                  fill="#A5B4FC"
                />
              ))}

              {
                /* Logo kecil di pojok */
                <text
                  x="380"
                  y="380"
                  fontSize="12"
                  fill="#CBD5E0"
                  textAnchor="end"
                >
                  HIMATI
                </text>
              }
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
