"use client";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#2c3e50]">ShaolaCare</h1>
        <ul className="hidden md:flex space-x-6">
          <li><a href="#" className="hover:text-[#2c3e50]">Home</a></li>
          <li><a href="#produk" className="hover:text-[#2c3e50]">Produk</a></li>
          <li><a href="#cara" className="hover:text-[#2c3e50]">Cara Pembelian</a></li>
          <li><a href="#kontak" className="hover:text-[#2c3e50]">Kontak</a></li>
        </ul>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <a href="#" className="block py-2">Home</a>
          <a href="#produk" className="block py-2">Produk</a>
          <a href="#cara" className="block py-2">Cara Pembelian</a>
          <a href="#kontak" className="block py-2">Kontak</a>
        </div>
      )}
    </nav>
  );
}
