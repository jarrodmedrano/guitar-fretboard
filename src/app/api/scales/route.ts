import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const scales = await prisma.scale.findMany({
    where: category ? { category } : undefined,
    orderBy: { name: "asc" },
  });

  return NextResponse.json(scales);
}

export async function POST(request: Request) {
  const body = await request.json();

  const scale = await prisma.scale.create({
    data: {
      name: body.name,
      intervals: body.intervals,
      notes: body.notes,
      category: body.category,
      description: body.description,
    },
  });

  return NextResponse.json(scale, { status: 201 });
}
