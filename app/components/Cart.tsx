import React, { useEffect, useState } from "react";

import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  selectCart,
  setIsCartOpen,
} from "../Redux/features/cartSlice";
import { useSession } from "next-auth/react";
import Link from "next/link";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const { data: session, status } = useSession();
  const [increase, setIncrease] = useState("");
  const [decrease, setDecrease] = useState("");

  const orderTotal = cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);

  const handleBackgroundClick = () => {
    dispatch(setIsCartOpen());
  };

  const removeItem = (id: string) => {
    dispatch(removeFromCart({ cartItemID: id }));
    if (session?.user) {
      fetch("/api/update-back-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cart,
          removeId: id,
        }),
      });
    }
  };

  const quantityChange = (id: string, value: string) => {
    if (value === "increase") {
      dispatch(increaseCount({ cartItemID: id }));
      setIncrease("increase");
    } else {
      dispatch(decreaseCount({ cartItemID: id }));
      setDecrease("decrease");
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetch("/api/update-back-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cart,
        }),
      });
    }
  }, [cart, increase, decrease]);

  return (
    <>
      <div
        className="fixed z-50 top-0 left-0 bg-overlay h-screen w-screen"
        onClick={() => handleBackgroundClick()}
      ></div>
      <div className="bg-white w-full sm:w-3/5 lg:w-2/5 h-screen top-0 right-0 fixed z-50">
        <div className="flex justify-between items-center gap-2 border-b-[1px] border-black px-6 py-4">
          <h1>Your Order</h1>
          <button onClick={() => handleBackgroundClick()}>&times;</button>
        </div>
        {cart.length === 0 && (
          <p className="px-6 mt-6 text-sm">You have no items in your cart</p>
        )}
        {cart.length > 0 && (
          <div className="py-4">
            <div className="overflow-auto h-[calc(100vh-300px)]">
              <div className="my-6 flex flex-col gap-4">
                {cart.map((item) => (
                  <div
                    key={item.cartItemID}
                    className="flex gap-4 items-center py-4 px-6 border-b-[1px] border-black"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                    />
                    <div className="w-full">
                      <p className="font-bold">{item.name}</p>
                      <p>${item.unit_amount! / 100}</p>
                      <div className="w-full flex justify-between items-end">
                        <div className="flex gap-1 items-center mt-2">
                          <AiOutlineMinusSquare
                            className="text-2xl hover: cursor-pointer"
                            onClick={() =>
                              quantityChange(item.cartItemID, "decrease")
                            }
                          />
                          <p>{item.quantity}</p>
                          <AiOutlinePlusSquare
                            className="text-2xl hover: cursor-pointe"
                            onClick={() =>
                              quantityChange(item.cartItemID, "increase")
                            }
                          />
                        </div>

                        <button
                          className=""
                          onClick={() => removeItem(item.cartItemID)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* subtotal */}
                <div className="border-t-[1px] border-black absolute w-full mx-auto bottom-10">
                  <div className="flex justify-between my-2 px-6">
                    <p>Subtotal</p>
                    <p>${orderTotal / 100}</p>
                  </div>
                  <div className="flex justify-between my-2 px-6">
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  <div className="border-t-[1px] border-black flex justify-between pt-2 px-6">
                    <p>Total</p>
                    <p>${orderTotal / 100}</p>
                  </div>
                  {/* checkout */}
                  {/* <div className="mt-4 bg-black text-white text-center py-3"> */}
                  <Link href="/checkout">
                    <button
                      className="mt-4 bg-black text-white text-center py-3 w-full"
                      onClick={() => dispatch(setIsCartOpen())}
                    >
                      CHECKOUT
                    </button>
                  </Link>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
