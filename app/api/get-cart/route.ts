import { authOptions } from "./../auth/[...nextauth]/route";

import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const userSession = await getServerSession(authOptions);
  if (!userSession?.user) {
    return NextResponse.json({ message: "Not logged in" });
  }
  const cart = await prisma.cart.findFirst({
    where: { user: { id: userSession.user?.id } },
    include: { products: true },
  });

  return NextResponse.json({ cart });
}
