export default function ProductSection() {
  return (
    <section id="produk" className="py-16 px-4 max-w-7xl mx-auto">
      <h3 className="text-2xl font-semibold text-center text-blue-700 mb-10">Produk Unggulan</h3>
      <div className="grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Tensimeter Digital",
            desc: "Akurat dan mudah digunakan untuk pengukuran tekanan darah.",
          },
          {
            title: "Thermometer Infrared",
            desc: "Pengukuran suhu cepat tanpa kontak langsung.",
          },
          {
            title: "Oximeter Digital",
            desc: "Pantau kadar oksigen dalam darah secara instan.",
          },
        ].map((item, index) => (
          <div key={index} className="bg-white shadow rounded p-6 text-center">
            <img src="https://via.placeholder.com/150" className="mx-auto mb-4" alt={item.title} />
            <h4 className="font-bold text-lg">{item.title}</h4>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
