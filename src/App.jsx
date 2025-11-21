import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Kabinet";
import Pricing from "./components/BadanPengurusInti";
import Testimonials from "./components/Perasa";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import AppBackground from "./utils/AppBackground";

function App() {
  const [scrolled, setScrolled] = useState(false);

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
      <Footer />
    </div>
  );
}

export default App;
