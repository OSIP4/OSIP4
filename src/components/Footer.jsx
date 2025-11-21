import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950/80 backdrop-blur-sm border-t border-slate-800 py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
      {/* Garis biru tipis di atas */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
        {/* Kolom 1: Logo & Deskripsi */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
            <img
              src="logo.png"
              alt="Logo OSIP4"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-white">OSIP4</span>
          </div>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            OSIP4 merupakan wadah pengembangan diri bagi seluruh siswa SMKN 4
            Padalarang untuk membangun komunitas yang kreatif, inovatif, dan
            berintegritas melalui berbagai kegiatan organisasi intrasekolah.
          </p>
        </div>

        {/* Kolom 2: Kontak & Lokasi */}
        <div className="text-center lg:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Kontak Kami</h3>
          <div className="space-y-3 text-gray-400 text-sm">
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>
                Kertajaya, Kec. Padalarang, Kabupaten Bandung Barat, Jawa Barat
                40553
              </span>
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>rezafairusnugraha@gmail.com</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>+62 858-6324-4821</span>
            </div>
          </div>

          {/* Peta Embed Gratis */}
          <div className="mt-6 bg-slate-900/50 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.9637057265168!2d107.48996057388604!3d-6.848750243149513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e354123cec23%3A0x8dddecf0bcf180f1!2sSMKN%204%20Padalarang%2C%20Kertajaya%2C%20Kec.%20Padalarang%2C%20Kabupaten%20Bandung%20Barat%2C%20Jawa%20Barat%2040553!5e1!3m2!1sid!2sid!4v1763645893262!5m2!1sid!2sid"
              width="100%"
              height="140"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
              title="Lokasi STT Nurul Fikri Kampus B"
            ></iframe>
          </div>
        </div>

        {/* Kolom 3: Sosial Media & Link Cepat */}
        <div className="text-center lg:text-left">
          <h3 className="text-lg font-semibold text-white mb-4">Ikuti Kami</h3>
          <div className="flex justify-center lg:justify-start space-x-4 mb-6">
            <a
              href="#"
              className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 pt-6 border-t border-slate-800 text-center text-gray-500 text-sm">
        © 2025 OSIP4. Dibuat dengan semangat oleh mahasiswa PPLG Dan Gamelab
        (Orace Academy)
      </div>
    </footer>
  );
}
