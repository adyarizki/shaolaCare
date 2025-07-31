import { PrismaClient } from '@/app/generated/prisma'; 

const prisma = new PrismaClient();

async function main() {
  await prisma.employee.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '081234567890',
        address: 'Jakarta',
        position: 'Software Engineer',
        department: 'IT',
        dateOfBirth: new Date('1990-01-15'),
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '081298765432',
        address: 'Bandung',
        position: 'Product Manager',
        department: 'Product',
        dateOfBirth: new Date('1985-04-20'),
      },
      {
        name: 'Michael Johnson',
        email: 'michael@example.com',
        phone: '081233344455',
        address: 'Surabaya',
        position: 'HR Specialist',
        department: 'HR',
        dateOfBirth: new Date('1988-09-10'),
      },
      {
        name: 'Lisa Aditya',
        email: 'lisa@example.com',
        phone: '081234000111',
        address: 'Yogyakarta',
        position: 'Marketing Executive',
        department: 'Marketing',
        dateOfBirth: new Date('1992-06-25'),
      },
      {
        name: 'Denny Pratama',
        email: 'denny@example.com',
        phone: '081211122233',
        address: 'Medan',
        position: 'Accountant',
        department: 'Finance',
        dateOfBirth: new Date('1987-11-30'),
      },
      {
        name: 'Rina Oktaviani',
        email: 'rina@example.com',
        phone: '081244455566',
        address: 'Bekasi',
        position: 'UI/UX Designer',
        department: 'Design',
        dateOfBirth: new Date('1993-03-10'),
      },
      {
        name: 'Agus Wibowo',
        email: 'agus@example.com',
        phone: '081277788899',
        address: 'Depok',
        position: 'DevOps Engineer',
        department: 'IT',
        dateOfBirth: new Date('1989-12-01'),
      },
      {
        name: 'Tania Kusuma',
        email: 'tania@example.com',
        phone: '081233344466',
        address: 'Semarang',
        position: 'Sales Executive',
        department: 'Sales',
        dateOfBirth: new Date('1995-05-15'),
      },
      {
        name: 'Andi Saputra',
        email: 'andi@example.com',
        phone: '081255566677',
        address: 'Malang',
        position: 'Business Analyst',
        department: 'Business',
        dateOfBirth: new Date('1986-08-18'),
      },
      {
        name: 'Melati Hidayah',
        email: 'melati@example.com',
        phone: '081299988877',
        address: 'Padang',
        position: 'Legal Officer',
        department: 'Legal',
        dateOfBirth: new Date('1991-10-05'),
      },
    ],
  });

  console.log('✅ 10 employee data seeded!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
