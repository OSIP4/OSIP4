import { Link } from "react-router-dom";

export default function BeritaCard({ data, onHapus }) {
  const BASE_URL = "https://kompetisi.pplgsmkn4.my.id/";

  const imageUrl = data.foto
    ? `${BASE_URL}/${data.foto}`
    : "https://via.placeholder.com/400x200/1e3a8a/FFFFFF?text=Berita+SMK";

  const tanggal = data.tanggal_post ? data.tanggal_post.split(" ")[0] : "—";

  return (
    <div className="bg-[#0A0F2D] rounded-2xl border border-gray-700 overflow-hidden shadow-md hover:shadow-lg transition relative">
      {/* Tanggal */}
      <div className="absolute bg-blue-600 text-white px-4 py-1 rounded-full m-4 text-sm font-semibold z-10">
        {tanggal}
      </div>

      {/* Gambar */}
      <img
        src={imageUrl}
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/400x200/1e3a8a/FFFFFF?text=Gagal+Load";
        }}
        className="w-full h-48 object-cover"
        alt={data.judul || "Berita"}
      />

      {/* Isi Card */}
      <div className="p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">
          {data.judul}
        </h2>

        <p className="text-gray-400 text-sm mb-3">
          Dibuat oleh: {data.pembuat}
        </p>

        <p className="text-gray-300 mb-6 line-clamp-3">{data.isi}</p>

        <div className="flex justify-between items-center">
          <Link
            to={`/berita/${data.id_berita || data.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-block text-sm"
          >
            Lihat Detail →
          </Link>

          {/* Tombol Hapus (hanya muncul jika onHapus disediakan) */}
          {onHapus && (
            <button
              onClick={onHapus}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
              title="Hapus berita"
            >
              Hapus
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
