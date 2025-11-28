/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// AOS untuk animasi scroll
import AOS from "aos";
import "aos/dist/aos.css";

// Pages & Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import JadwalApelPage from "./pages/JadwalApelPage";
import BeritaPage from "./pages/BeritaPage";
import Home from "./pages/Home";
import TentangKamiPage from "./pages/TentangKamiPage";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import BeritaDetail from "./pages/BeritaDetailPage";

// Hook khusus untuk refresh AOS saat ganti halaman
function useAOS() {
  const location = useLocation();
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true, // animasi hanya sekali per scroll
      easing: "ease-out-cubic",
    });
    AOS.refresh(); // refresh saat route berubah
  }, [location]);
}

function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Inisialisasi AOS di layout utama
  useAOS();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar user={user} setUser={setUser} scrolled={scrolled} />
      <main className="pt-5 sm:pt-10 md:pt-15">
        <AppContent user={user} />
      </main>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </div>
  );
}

function AppContent({ user }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/jadwal-apel" element={<JadwalApelPage user={user} />} />
      <Route path="/berita" element={<BeritaPage user={user} />} />
      <Route path="/berita/:id" element={<BeritaDetail user={user} />} />
      <Route path="/tentang-kami" element={<TentangKamiPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
