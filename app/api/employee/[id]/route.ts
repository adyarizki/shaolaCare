import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Params = {
  params: { id: string };
};

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await params before accessing its properties
    const { id } = await context.params;
    
    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      return NextResponse.json({ error: "employee not found" }, { status: 404 });
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Get error:", error);
    return NextResponse.json({ error: "Failed to fetch employee" }, { status: 500 });
  }
}

// UPDATE ingredient by id
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await params before accessing its properties
    const { id } = await context.params;
    
    const { name, email, phone, address, position, department } = await req.json();

    const updated = await prisma.employee.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        address,
        position,
        department,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}

// DELETE ingredient by id
export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    // Await params before accessing its properties
    const { id } = await context.params;
    
    await prisma.employee.delete({
      where: { id },
    });

    return NextResponse.json({ message: "employee deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete employee" }, { status: 500 });
  }
}
