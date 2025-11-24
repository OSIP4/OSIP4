import { Link } from "react-router-dom";

export default function BeritaCard({ data }) {
  return (
    <div className="bg-[#0A0F2D] rounded-2xl border border-gray-700 overflow-hidden shadow-md hover:shadow-lg transition">
      
      {/* Tanggal */}
      <div className="absolute bg-blue-600 text-white px-4 py-1 rounded-full m-4 text-sm font-semibold z-10">
        {data.tanggal}
      </div>

      {/* Gambar */}
      <img 
        src={data.gambar} 
        className="w-full h-48 object-cover"
        alt={data.judul}
      />

      {/* Isi Card */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">
          {data.judul}
        </h2>

        <p className="text-gray-400 text-sm mb-3">
          Dibuat oleh: {data.penulis}
        </p>

        <p className="text-gray-300 mb-6 line-clamp-3">
          {data.isi}
        </p>

        <Link 
          to={`/berita/${data.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block"
        >
          Lihat Detail →
        </Link>
      </div>
    </div>
  );
}
