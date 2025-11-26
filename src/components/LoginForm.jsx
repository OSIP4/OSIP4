import { useState } from "react";
import axios from "axios";

export default function LoginForm({ onLoginSuccess, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password)
      return alert("Username dan Password wajib diisi");

    setLoading(true);

    try {
      const response = await axios.post(
        "https://kompetisi.pplgsmkn4.my.id/Kompetisi/api/login.php",
        { username, password }
      );

      const data = response.data;

      if (data.status === "success") {
        if (onLoginSuccess) onLoginSuccess(data.user); // kirim user ke App
        if (onClose) onClose(); // tutup form
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-slate-800 p-6 rounded shadow-lg w-80">
        <h2 className="text-white text-xl mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <div className="flex justify-end items-center space-x-2">
            <button
              type="submit"
              className="px-3 py-1 rounded border border-gray-400 text-white hover:border-white"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </button>
            {onClose && (
              <button
                type="button"
                className="px-3 py-1 rounded border border-gray-400 text-white hover:border-white"
                onClick={onClose}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
