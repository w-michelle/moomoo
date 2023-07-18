"use client";
import { useEffect } from "react";
import {
  clearCart,
  selectCart,
  selectPaymentIntent,
  setCheckout,
  setPaymentIntent,
} from "../Redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const OrderConfirmed = () => {
  const cart = useSelector(selectCart);
  const paymentIntent = useSelector(selectPaymentIntent);
  const dispatch = useDispatch();
  useEffect(() => {
    setPaymentIntent("");
    dispatch(clearCart());

    fetch("/api/remove-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cart: cart,
      }),
    });
  }, []);

  const checkoutOrder = () => {
    setTimeout(() => {
      setCheckout("");
    }, 1000);
  };

  return (
    <div className="w-full min-h-[100vh] flex flex-col items-center justify-center p-10">
      <h1 className="text-2xl font-bold mb-4">THANK YOU</h1>
      <p className="text-center">
        Your order has been received and we are excited to send it your way!
      </p>
      <Link href="/dashboard">
        <button
          onClick={checkoutOrder}
          className="py-4 w-[300px] bg-black text-white font-semibold mt-4"
        >
          Check your Order
        </button>
      </Link>
    </div>
  );
};

export default OrderConfirmed;
