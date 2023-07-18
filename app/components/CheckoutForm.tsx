"use client";
import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { selectCart, setCheckout } from "../Redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const CheckoutForm = (clientSecret: { clientSecret: string }) => {
  const cart = useSelector(selectCart);

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  useEffect(() => {
    console.log(clientSecret);
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://moomoobaked.vercel.app/order-confirmation",
        },
      })
      .then((result) => {
        console.log(result);
        if (!result.error) {
          dispatch(setCheckout("success"));
        } else {
          console.log(result.error);
        }

        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-[100vh]">
      <h1 className="text-2xl mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} id="payment-form">
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <h2 className="mt-10 mb-6">Shipping Address</h2>
        <AddressElement options={{ mode: "shipping" }} />
        <h2 className="my-8 font-bold">Total: ${totalPrice / 100}</h2>
        <button
          className={`py-2 mt-4  w-full bg-black rounded-md text-white disabled:opacity-25`}
          id="submit"
          disabled={isLoading || !stripe || !elements}
        >
          <span id="button-text">
            {isLoading ? <span>Processing</span> : <span>Pay now</span>}
          </span>
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
