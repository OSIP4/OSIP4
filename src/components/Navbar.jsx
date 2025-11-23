import { Menu, X } from "lucide-react";
import { useState } from "react";
<<<<<<< HEAD

export default function Navbar({ scrolled }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
          : "bg-slate-950/20 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          <div className="flex items-center space-x-1 group cursor-pointer">
            <div>
              <img
                src="/logo.png"
                alt="CodeFlow"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-medium">
              <span className="text-white">OSIP</span>
              <span className="text-blue-400">4</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Berita
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Perasa
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Tentang Kami
            </a>
          </div>

          <button
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuIsOpen((prev) => !prev)}
          >
            {mobileMenuIsOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuIsOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
          <div className="px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
            <a
              href="#features"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Features
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuIsOpen(false)}
              className="block text-gray-300 hover:text-white text-sm lg:text-base"
            >
              Testimonials
            </a>
          </div>
        </div>
      )}
    </nav>
=======
import LoginForm from "./LoginForm";

export default function Navbar({ page, setPage, scrolled, user, setUser }) {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navLinks = [
    { name: "Home", key: "home" },
    { name: "Berita", key: "berita" },
    { name: "Jadwal Apel", key: "apel" },
    { name: "Perasa", key: "perasa", href: "#perasa" },
    { name: "Tentang Kami", key: "tentang", href: "#tentang" },
  ];

  const renderLink = (link, isMobile = false) => {
    if (link.href) {
      return (
        <a
          key={link.key}
          href={link.href}
          onClick={() => isMobile && setMobileMenuIsOpen(false)}
          className={`text-sm lg:text-base ${isMobile ? "block w-full text-left py-2" : ""} text-gray-300 hover:text-white`}
        >
          {link.name}
        </a>
      );
    }

    return (
      <button
        key={link.key}
        onClick={() => {
          setPage(link.key);
          if (isMobile) setMobileMenuIsOpen(false);
        }}
        className={`text-sm lg:text-base ${page === link.key ? "text-blue-400" : "text-gray-300 hover:text-white"} ${isMobile ? "block w-full text-left py-2" : ""}`}
      >
        {link.name}
      </button>
    );
  };

  const handleLogout = () => setUser(null);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/80 backdrop-blur-lg border-b border-slate-800" : "bg-slate-950/20 backdrop-blur-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-1 cursor-pointer">
              <img src="/logo.png" alt="OSIP4" className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-lg sm:text-xl md:text-2xl font-medium">
                <span className="text-white">OSIP</span>
                <span className="text-blue-400">4</span>
              </span>
            </div>

            {/* Nav Links Desktop */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => renderLink(link))}

              {/* Login / Logout seperti link biasa */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className={`text-sm lg:text-base text-gray-300 hover:text-white`}
                >
                  Logout ({user.username})
                </button>
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className={`text-sm lg:text-base text-gray-300 hover:text-white`}
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-gray-300 hover:text-white" onClick={() => setMobileMenuIsOpen((prev) => !prev)}>
              {mobileMenuIsOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuIsOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 animate-in slide-in-from-top duration-300">
            <div className="px-4 py-4 sm:py-6 space-y-2">
              {navLinks.map((link) => renderLink(link, true))}

              {user ? (
                <button
                  onClick={() => { handleLogout(); setMobileMenuIsOpen(false); }}
                  className="block w-full text-left text-gray-300 hover:text-white text-sm lg:text-base"
                >
                  Logout ({user.username})
                </button>
              ) : (
                <button
                  onClick={() => { setShowLogin(true); setMobileMenuIsOpen(false); }}
                  className="block w-full text-left text-gray-300 hover:text-white text-sm lg:text-base"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Modal Login */}
      {showLogin && <LoginForm onLoginSuccess={setUser} onClose={() => setShowLogin(false)} />}
    </>
>>>>>>> c4bbe0a (Add Page Jadwal Apel and Berita)
  );
}
