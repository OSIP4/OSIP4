<<<<<<< HEAD
=======
import { useEffect, useState } from "react";
>>>>>>> c4bbe0a (Add Page Jadwal Apel and Berita)
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Kabinet";
import Pricing from "./components/BadanPengurusInti";
import Testimonials from "./components/Perasa";
import Footer from "./components/Footer";
<<<<<<< HEAD
import { useEffect, useState } from "react";
=======
import JadwalApelPage from "./components/JadwalApelPage";
import BeritaPage from "./components/BeritaPage";
>>>>>>> c4bbe0a (Add Page Jadwal Apel and Berita)
import AppBackground from "./utils/AppBackground";

function App() {
  const [scrolled, setScrolled] = useState(false);
<<<<<<< HEAD

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar scrolled={scrolled} />
      <Hero />
      <Features />
      <AppBackground>
        <Pricing />
        <Testimonials />
      </AppBackground>
=======
  const [page, setPage] = useState("home"); // home, berita, apel
  const [user, setUser] = useState(null); // null = belum login

  // Ambil user dari localStorage saat mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout dan hapus dari localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <Navbar
        scrolled={scrolled}
        page={page}
        setPage={setPage}
        user={user}
        setUser={setUser} // Navbar bisa update user saat login/logout
      />

      {/* Halaman Home */}
      {page === "home" && (
        <>
          <Hero />
          <Features />
          <AppBackground>
            <Pricing />
            <Testimonials />
          </AppBackground>
        </>
      )}

      {/* Halaman Berita */}
      {page === "berita" && <BeritaPage user={user} />}

      {/* Halaman Jadwal Apel */}
      {page === "apel" && <JadwalApelPage user={user} />}

>>>>>>> c4bbe0a (Add Page Jadwal Apel and Berita)
      <Footer />
    </div>
  );
}

export default App;
