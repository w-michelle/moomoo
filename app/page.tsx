"use client";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "./Redux/features/cartSlice";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      const response = await fetch("/api/get-cart");
      const data = await response.json();

      if (data.cart && data.cart.products) {
        const products = data.cart.products;
        products.forEach((item: any) => dispatch(addToCart(item)));
      }
    };
    fetchCartData();
  }, []);
  return (
    <main className="w-full min-h-[100vh]">
      <div className="w-screen h-screen relative">
        <Image
          src="/assets/hero.png"
          alt="hero image"
          fill
          className="object-cover"
        />
      </div>
    </main>
  );
}

{
}
