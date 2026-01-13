import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const chords = await prisma.chord.findMany({
    where: category ? { category } : undefined,
    orderBy: { name: "asc" },
  });

  return NextResponse.json(chords);
}

export async function POST(request: Request) {
  const body = await request.json();

  const chord = await prisma.chord.create({
    data: {
      name: body.name,
      intervals: body.intervals,
      category: body.category,
      description: body.description,
    },
  });

  return NextResponse.json(chord, { status: 201 });
}
