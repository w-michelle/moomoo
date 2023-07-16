import { authOptions } from "./../auth/[...nextauth]/route";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/util/prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  const userSession = await getServerSession(authOptions);
  if (!userSession?.user) {
    return NextResponse.json({ message: "Not logged in" });
  }

  const { cart, removeId } = await req.json();

  const cartData = {
    user: { connect: { id: userSession.user?.id } },
    products: {
      create: cart.map((item: any) => ({
        cartItemID: item.cartItemID,
        name: item.name,
        description: item.description || null,
        unit_amount: parseFloat(item.unit_amount),
        image: item.image,
        quantity: item.quantity,
      })),
    },
  };

  const existingCart = await prisma.cart.findFirst({
    where: { user: { id: userSession.user?.id } },
    include: { products: true },
  });

  if (!existingCart) {
    await prisma.cart.create({
      data: cartData,
    });
    return NextResponse.json({ message: "Cart created successfully" });
  } else {
    if (removeId) {
      await prisma.product.deleteMany({
        where: {
          cartId: existingCart.id,
          id: removeId,
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: existingCart.id },
        data: {
          products: {
            deleteMany: {},
            create: cart.map((item: any) => ({
              cartItemID: item.cartItemID,
              name: item.name,
              description: item.description || null,
              unit_amount: parseFloat(item.unit_amount),
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      });
      return NextResponse.json({ message: "Cart updated successfully" });
    }
  }
}
