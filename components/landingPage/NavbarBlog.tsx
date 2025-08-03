"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="images/letter-s.png" alt="Logo" className="w-8 h-8" />
          <span className=" ml-1 text-xl font-bold text-[#2c3e50]">ShaolaCare</span>
        </div>
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link href="/" className="hover:text-[#2c3e50]">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blogpost" className="hover:text-[#2c3e50]">
              Blog health
            </Link>
          </li>
        </ul>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <li>
            <Link href="/" className="hover:text-[#2c3e50]">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blogpost" className="hover:text-[#2c3e50]">
              Blog health
            </Link>
          </li>
        </div>
      )}
    </nav>
  );
}
