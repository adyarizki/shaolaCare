import { PrismaClient } from '@/app/generated/prisma'; 

const prisma = new PrismaClient();

async function main() {
  const blogposts = [
    {
      title: 'Pentingnya Memiliki Alat Kesehatan di Rumah',
      content:
        'Alat kesehatan seperti termometer, tensimeter, dan oksimeter sangat penting untuk pemantauan kondisi kesehatan mandiri. Dengan alat ini, kita bisa mendeteksi gejala awal dan mengambil tindakan lebih cepat.',
    },
    {
      title: 'Cara Memilih Tensimeter yang Tepat untuk Keluarga',
      content:
        'Tensimeter tersedia dalam berbagai jenis, seperti digital dan manual. Untuk penggunaan rumahan, tensimeter digital lebih direkomendasikan karena praktis dan mudah digunakan tanpa bantuan medis.',
    },
    {
      title: 'Fungsi dan Manfaat Oximeter dalam Pemantauan Kesehatan',
      content:
        'Oximeter digunakan untuk mengukur saturasi oksigen dalam darah dan detak jantung. Alat ini sangat bermanfaat terutama bagi penderita asma, COVID-19, atau gangguan pernapasan lainnya.',
    },
    {
      title: 'Tips Merawat Alat Kesehatan agar Awet dan Akurat',
      content:
        'Selalu bersihkan alat kesehatan dengan alkohol setelah digunakan. Simpan di tempat yang sejuk, kering, dan jauh dari sinar matahari langsung. Hindari menjatuhkan alat untuk menjaga keakuratannya.',
    },
    {
      title: 'Perbedaan Termometer Raksa, Digital, dan Inframerah',
      content:
        'Termometer raksa kurang aman karena bahan berbahaya. Termometer digital lebih aman dan akurat, sedangkan inframerah memungkinkan pengukuran suhu tanpa kontak langsung.',
    },
    {
      title: 'Kapan Harus Menggunakan Alat Cek Gula Darah?',
      content:
        'Pemeriksaan gula darah sebaiknya dilakukan pagi hari sebelum makan atau dua jam setelah makan. Untuk penderita diabetes, pengukuran rutin membantu mengontrol kadar gula dengan lebih efektif.',
    },
    {
      title: 'Alat Kesehatan Wajib untuk Lansia di Rumah',
      content:
        'Lansia sebaiknya memiliki tensimeter, termometer, alat cek gula darah, dan kursi roda jika diperlukan. Alat-alat ini membantu dalam pemantauan rutin dan memberikan kenyamanan sehari-hari.',
    },
  ];

  for (const post of blogposts) {
    await prisma.blogpost.create({
      data: post,
    });
  }

  console.log('✅ Blogpost alat kesehatan berhasil di-seed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });