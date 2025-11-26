// src/pages/BeritaDetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function BeritaDetailPage() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isImageOpen, setIsImageOpen] = useState(false); // ✅ state untuk lightbox

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await axios.get(
          `https://kompetisi.pplgsmkn4.my.id/Kompetisi/api/get_berita_by_id.php?id=${id}`
        );
        setBerita(res.data);
      } catch (err) {
        console.error("Gagal memuat detail berita:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0C112A] text-white flex items-center justify-center">
        <p>Memuat berita...</p>
      </div>
    );
  }

  if (!berita || berita.error) {
    return (
      <div className="min-h-screen bg-[#0C112A] text-white p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Berita Tidak Ditemukan</h2>
          <p className="text-gray-400 mb-6">
            Maaf, berita yang Anda cari tidak tersedia.
          </p>
          <Link
            to="/berita"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            ← Kembali ke Daftar Berita
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const tanggal = formatDate(berita.tanggal_post);
  const imageUrl = berita.foto
    ? `https://kompetisi.pplgsmkn4.my.id/${berita.foto}`
    : null;

  return (
    <div className="min-h-screen bg-[#0C112A] text-gray-300 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/berita"
          className="inline-flex items-center text-blue-400 hover:underline mb-6"
        >
          ← Kembali ke daftar berita
        </Link>

        <article className="bg-[#0A0F2D] rounded-2xl border border-gray-700 overflow-hidden shadow-lg">
          {/* Gambar Utama yang Bisa Diklik → Buka Lightbox */}
          {imageUrl && (
            <div
              className="w-full h-64 md:h-96 overflow-hidden cursor-pointer"
              onClick={() => setIsImageOpen(true)} // ✅ buka lightbox
            >
              <img
                src={imageUrl}
                alt={berita.judul}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="text-sm text-gray-400 mb-2">
              Dipublikasikan pada: {tanggal}
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              {berita.judul}
            </h1>

            <p className="text-sm text-gray-400 mb-6">
              Dibuat oleh:{" "}
              <span className="font-medium text-white">{berita.pembuat}</span>
            </p>

            <div className="prose prose-invert max-w-none text-gray-300">
              <div
                className="whitespace-pre-line text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: berita.isi.replace(/\n/g, "<br>"),
                }}
              />
            </div>
          </div>
        </article>
      </div>

      {/* ✅ LIGHTBOX MODAL */}
      {isImageOpen && imageUrl && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageOpen(false)} // tutup saat klik background
        >
          <div
            className="relative max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt={berita.judul}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <button
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black"
              onClick={() => setIsImageOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
