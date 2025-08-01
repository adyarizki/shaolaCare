export default function BlogSection() {
  return (
    <section id="blog" className="bg-gray-100 py-16 px-4">
      <h3 className="text-2xl font-semibold text-center text-blue-700 mb-10">Artikel Terbaru</h3>
      <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
        <div className="bg-white shadow rounded p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-2">Tips Merawat Alat Medis di Rumah</h4>
          <p className="text-gray-600">Pelajari bagaimana cara menjaga alat kesehatan Anda tetap steril dan awet.</p>
        </div>
        <div className="bg-white shadow rounded p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-2">Teknologi Baru dalam Dunia Medis</h4>
          <p className="text-gray-600">Inovasi terbaru yang membuat diagnosis dan perawatan lebih cepat dan akurat.</p>
        </div>
      </div>
    </section>
  );
}
