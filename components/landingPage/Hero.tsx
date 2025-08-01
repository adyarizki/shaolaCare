// components/hero.tsx
'use client';

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section
      className="relative h-[80vh] bg-[#355372] bg-cover bg-center flex items-center justify-center text-white"
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Solusi Alat Kesehatan Terpercaya
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto text-white/90">
          Kami menyediakan peralatan medis modern dan berkualitas tinggi untuk mendukung layanan kesehatan Anda.
        </p>
        <Button className="mt-6 text-lg px-6 py-4 bg-gray-200 text-[#355372] hover:bg-gray-300" asChild >
          <a href="#produk">Lihat Produk</a>
        </Button>
      </div>
    </section>
  );
}
