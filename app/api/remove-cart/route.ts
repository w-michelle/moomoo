import { authOptions } from "./../auth/[...nextauth]/route";

import { NextResponse, NextRequest } from "next/server";

import { getServerSession } from "next-auth";

import { prisma } from "@/util/prisma";
export async function POST(req: NextRequest, res: NextResponse) {
  //Get user
  const userSession = await getServerSession(authOptions);
  if (!userSession?.user) {
    return NextResponse.json({ message: "Not logged in" });
  }
  const existingCart = await prisma.cart.findFirst({
    where: { user: { id: userSession.user?.id } },
    include: { products: true },
  });
  if (existingCart) {
    await prisma.cart.delete({
      where: { id: existingCart.id },
    });
  }
  return NextResponse.json({ message: "Cart Deleted" });
}
