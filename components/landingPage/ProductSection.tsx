export default function ProductSection() {
  return (
    <section id="produk" className="py-16 px-4 max-w-7xl mx-auto">
      <h3 className="text-2xl font-semibold text-center text-[#355372]  mb-10">Produk Unggulan</h3>
      <div className="grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Tensimeter Digital",
            desc: "Akurat dan mudah digunakan untuk pengukuran tekanan darah.",
            image: "/images/tensimeterdigital.jpeg",
          },
          {
            title: "Thermometer Infrared",
            desc: "Pengukuran suhu cepat tanpa kontak langsung.",
            image: "/images/ThermometerInfrared.jpg",
          },
          {
            title: "Oximeter Digital",
            desc: "Pantau kadar oksigen dalam darah secara instan.",
            image: "/images/OximeterDigital.webp",
          },
        ].map((item, index) => (
          <div key={index} className="bg-white shadow rounded p-6 text-center">
            <img src={item.image} className="mx-auto mb-4 h-36 object-contain" alt={item.title} />
            <h4 className="font-bold text-lg">{item.title}</h4>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
