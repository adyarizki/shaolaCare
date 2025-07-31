// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from "zod";


export async function GET() {
  const employees = await prisma.employee.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(employees);
}


const employeeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  position: z.string(),
  department: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = employeeSchema.parse(body);

    const newEmployee = await prisma.employee.create({
      data: validatedData,
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("[EMPLOYEE_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}