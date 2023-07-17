import { authOptions } from "./../auth/[...nextauth]/route";

import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const userSession = await getServerSession(authOptions);
  if (!userSession?.user) {
    return NextResponse.json({ message: "Not logged in" });
  }
  const orders = await prisma.order.findMany({
    where: { userId: userSession.user.id, status: "complete" },
    include: { products: true },
  });
  return NextResponse.json(orders);
}
