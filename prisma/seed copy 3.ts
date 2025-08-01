import { PrismaClient } from '@/app/generated/prisma'; 

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: 'Tensimeter Digital',
      stock: 50,
      price: 450000,
    },
    {
      name: 'Termometer Inframerah',
      stock: 100,
      price: 150000,
    },
    {
      name: 'Stetoskop Kardiologi',
      stock: 30,
      price: 600000,
    },
    {
      name: 'Nebulizer Portable',
      stock: 40,
      price: 700000,
    },
    {
      name: 'Alat Cek Gula Darah',
      stock: 75,
      price: 250000,
    },
    {
      name: 'Oksimeter Jari',
      stock: 60,
      price: 200000,
    },
    {
      name: 'Kursi Roda Aluminium',
      stock: 20,
      price: 1200000,
    },
    {
      name: 'Alat Cek Kolesterol',
      stock: 50,
      price: 350000,
    },
    {
      name: 'Infus Stand Stainless',
      stock: 25,
      price: 500000,
    },
    {
      name: 'Timbangan Digital Pasien',
      stock: 15,
      price: 850000,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('✅ Seeding selesai.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
