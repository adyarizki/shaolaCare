'use client';
import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Pesan berhasil ditambahkan!");
      setFormData({ nama: "", email: "", message: "" });
    } else {
      alert("Gagal menambahkan pesan.");
    }
  };

  return (
    <section id="kontak" className="py-16 px-4 max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold text-center text-blue-700 mb-10">
        Hubungi Kami
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          type="text"
          placeholder="Nama Anda"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />

        <input
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email Anda"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />

        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Pesan Anda"
          className="w-full p-3 border border-gray-300 rounded"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Kirim
        </button>
      </form>
    </section>
  );
}
