import { useState, useEffect } from "react";

export default function AppBackground({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Efek latar belakang interaktif berbasis posisi mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Latar belakang dinamis mengikuti mouse */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Elemen dekoratif blur */}
      <div className="absolute top-1/6 left-1/10 w-40 h-40 sm:w-60 sm:h-60 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/6 right-1/10 w-48 h-48 sm:w-80 sm:h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

      {/* Konten utama */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
