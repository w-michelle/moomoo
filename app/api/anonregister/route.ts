import { prisma } from "@/util/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username } = body;

  const user = await prisma.user.create({
    data: {
      email: username,
    },
  });

  return NextResponse.json({ user });
}
