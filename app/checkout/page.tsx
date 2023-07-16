"use client";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm from "../components/CheckoutForm";
import { useSelector, useDispatch } from "react-redux";

import {
  selectCart,
  selectCheckoutStatus,
  selectPaymentIntent,
} from "../Redux/features/cartSlice";
import { setPaymentIntent } from "../Redux/features/cartSlice";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function Checkout() {
  const cart = useSelector(selectCart);
  const paymentIntent = useSelector(selectPaymentIntent);
  const checkoutStatus = useSelector(selectCheckoutStatus);
  const router = useRouter();
  const dispatch = useDispatch();
  const [clientSecret, setClientSecret] = useState("");
  const { data: session, status } = useSession();
  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          if (res.status === 403) {
            return router.push("/login");
            // return router.push("/api/auth/signin");
          }
          return res.json();
        })
        .then((data) => {
          setClientSecret(data.paymentIntent.client_secret);
          dispatch(setPaymentIntent(data.paymentIntent.id));
        });
    }
    //create paymentIntent as soon as page loads up
  }, []);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  return (
    <div className="w-full h-[calc(100vh-100px)]">
      {checkoutStatus === "" && clientSecret && (
        <div className="w-full p-4">
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </div>
      )}
    </div>
  );
}

export default Checkout;
