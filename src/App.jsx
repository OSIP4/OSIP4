/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JadwalApelPage from "./pages/JadwalApelPage";
import BeritaPage from "./pages/BeritaPage";
import Home from "./pages/Home";
import TentangKamiPage from "./pages/TentangKamiPage";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import BeritaDetail from "./components/BeritaDetail";

function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // Load user dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Simpan ke localStorage saat user berubah
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar user={user} setUser={setUser} scrolled={scrolled} />
      <main className="pt-5 sm:pt-10 md:pt-15">
        <AppContent user={user} setUser={setUser} />
      </main>
      <Footer />
    </div>
  );
}

// ✅ Terima user dan setUser sebagai prop
function AppContent({ user, setUser }) {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/jadwal-apel" element={<JadwalApelPage user={user} />} />
      {/* ✅ Kirim prop user ke BeritaPage */}
      <Route path="/berita" element={<BeritaPage user={user} />} />
      {/* ✅ Kirim prop user ke BeritaDetail (jika butuh) */}
      <Route path="/berita/:id" element={<BeritaDetail user={user} />} />
      <Route path="/tentang-kami" element={<TentangKamiPage />} />
    </Routes>
  );
}

// Wrapper dengan Router
export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
