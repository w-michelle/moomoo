"use client";
import { CartItem, addToCart } from "@/app/Redux/features/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {};

const AddCart = ({
  name,
  unit_amount,
  quantity,
  image,
  cartItemID,
}: CartItem) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ name, unit_amount, quantity, image, cartItemID }));
  };

  return (
    <div>
      <button
        className="md:text-md text-[12px] py-2 px-3 md:py-3 md:px-5 bg-black text-white mt-4"
        onClick={handleAddToCart}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default AddCart;
