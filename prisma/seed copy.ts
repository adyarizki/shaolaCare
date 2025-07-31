// prisma/seed.ts
import { PrismaClient } from '@/app/generated/prisma'; 

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      {
        name: 'Kertas A4 80gsm',
        price: 45000,
        stock: 100,
      },
      {
        name: 'Pulpen Snowman',
        price: 7000,
        stock: 200,
      },
      {
        name: 'Buku Tulis Sidu',
        price: 12000,
        stock: 150,
      },
      {
        name: 'Stapler Kangaroo',
        price: 30000,
        stock: 50,
      },
      {
        name: 'Lakban Bening',
        price: 10000,
        stock: 80,
      },
    ],
  });

  console.log('✅ Seed product berhasil');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());