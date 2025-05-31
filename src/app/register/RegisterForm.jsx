"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== passwordRepeat) {
      setMessage("⚠️ Password tidak sama.");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const result = await res.json();
      setMessage("✅ Pendaftaran berhasil!");
      if (result.success) {
        router.push("/login");
      }
    } catch (error) {
      setMessage("❌ Gagal daftar: " + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-14 bg-white border border-gray-200 shadow-2xl rounded-3xl px-10 py-12 text-black">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Buat Akun Baru</h2>

      <form onSubmit={handleRegister} className="space-y-6">
        <div className="text-black">
          <label className="block text-gray-700 mb-1 font-medium">Nama Lengkap</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl text-sm text-black"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Ulangi Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-200 text-sm font-semibold"
        >
          Daftar Sekarang
        </button>
      </form>

      {message && <p className="text-center mt-6 text-sm font-medium text-red-500">{message}</p>}
    </div>
  );
}
