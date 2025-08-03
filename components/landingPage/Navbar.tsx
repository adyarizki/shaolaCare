"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/images/letter-s.png"
            alt="Logo"
            width={32}
            height={32}
          />
          <span className="ml-1 text-xl font-bold text-[#2c3e50]">ShaolaCare</span>
        </div>

        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="hover:text-[#2c3e50]">Home</Link>
          </li>
          <li>
            <Link href="#produk" className="hover:text-[#2c3e50]">Produk</Link>
          </li>
          <li>
            <Link href="#cara" className="hover:text-[#2c3e50]">Cara Pembelian</Link>
          </li>
          <li>
            <Link href="#kontak" className="hover:text-[#2c3e50]">Kontak</Link>
          </li>
          <li>
            <Link href="/blogpost" className="hover:text-[#2c3e50]">Blog health</Link>
          </li>
        </ul>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <Link href="/" className="block py-2">Home</Link>
          <Link href="#produk" className="block py-2">Produk</Link>
          <Link href="#cara" className="block py-2">Cara Pembelian</Link>
          <Link href="#kontak" className="block py-2">Kontak</Link>
          <Link href="/blogpost" className="block py-2">Blog health</Link>
        </div>
      )}
    </nav>
  );
}
