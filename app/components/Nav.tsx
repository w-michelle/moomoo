"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { signIn, signOut, useSession } from "next-auth/react";
import Cart from "./Cart";
import {
  addToCart,
  selectCart,
  selectCartOpen,
  setCheckout,
  setIsCartOpen,
} from "../Redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
type Props = {};

const Nav = (props: Props) => {
  const [toggle, setToggle] = useState(false);
  const { data: session, status } = useSession();
  const [toggleProfile, setToggleProfile] = useState(false);

  const dispatch = useDispatch();
  const cartOpen = useSelector(selectCartOpen);
  const cart = useSelector(selectCart);
  const numOfItems = cart.reduce((acc, item) => {
    return acc + item.quantity!;
  }, 0);

  useEffect(() => {
    setTimeout(() => {
      const fetchCartData = async () => {
        const response = await fetch("/api/get-cart");
        const data = await response.json();

        if (data.cart && data.cart.products) {
          const products = data.cart.products;
          products.forEach((item: any) => dispatch(addToCart(item)));
        }
      };
      fetchCartData();
    }, 3000);
  }, []);
  console.log(session);

  return (
    <div className="w-full flex items-center px-4 justify-between">
      {/* menu icon */}
      <FiMenu
        className="text-2xl lg:hidden"
        onClick={() => setToggle(!toggle)}
      />
      {/* mobilemenu */}
      {toggle && (
        <div
          className="bg-overlay w-screen h-screen absolute top-0 left-0 z-50"
          onClick={() => setToggle(!toggle)}
        >
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col bg-white h-screen w-3/4"
          >
            <div className="flex flex-col gap-2 px-4 py-8 text-3xl hover: cursor-pointer">
              <Link href="/flavors">Flavors</Link>
              <Link href="/dailymenu">Daily Menu</Link>
              <Link href="/">About</Link>
            </div>
            <div className="border-t-[1px] border-black w-full px-4 py-6">
              {!session?.user && (
                <Link href="/login" className="hover: cursor-pointer">
                  Log in
                </Link>
              )}
              {session?.user && (
                <div className="flex flex-col items-start">
                  <Link href="/dashboard">Orders</Link>
                  <button onClick={() => signOut()}>Log out</button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
      {/*desktop  */}
      <div className="w-[100px] h-[100px]">
        <Link href="/">
          <Image
            src="/assets/MOOMOO.png"
            alt="Moo Moo Baked Logo"
            width={150}
            height={150}
          />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/flavors">Flavors</Link>
          <Link href="/dailymenu">Daily Menu</Link>
          {!session?.user && (
            <Link href="/login" className="hover: cursor-pointer">
              Log in
            </Link>
          )}
          {session?.user && (
            <div className="relative">
              <CgProfile
                className="text-3xl hover:cursor-pointer"
                onClick={() => setToggleProfile(!toggleProfile)}
              />

              {toggleProfile && (
                <div className="bg-[#EAEAEA] text-center rounded-md p-3 w-[100px] absolute bottom-[-120px] left-[-35px] z-50">
                  <Link
                    href="/dashboard"
                    onClick={() => setToggleProfile(!toggleProfile)}
                  >
                    <p className="my-2">Orders</p>
                  </Link>

                  <hr />
                  <p
                    className="my-2 hover:cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Log out
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <button
          className="bg-black text-white px-4 py-2 rounded-3xl flex gap-2 lg:mr-2"
          onClick={() => dispatch(setIsCartOpen())}
        >
          <span className="hidden lg:block">Cart</span>
          <span>{numOfItems}</span>
        </button>
        {cartOpen && <Cart />}
      </div>
    </div>
  );
};

export default Nav;
