import React from "react";
import { Product } from "../Redux/features/cartSlice";
import Image from "next/image";
import Link from "next/link";
type Props = {};

const Product = ({
  name,
  unit_amount,
  quantity,
  image,
  cartItemID,
  description,
}: Product) => {
  return (
    <Link
      href={{
        pathname: `/product/${cartItemID}`,
        query: {
          name,
          unit_amount,
          quantity,
          image,
          cartItemID,
          description,
        },
      }}
    >
      <div className="flex flex-col items-center h-[300px] sm:h-[350px] md:h-[540px] lg:h-[350px] xl:h-[460px]">
        <div className="border-2 border-black w-full h-full relative flex flex-col items-center">
          <Image src={image} alt={name} fill style={{ objectFit: "cover" }} />
        </div>
        <div className="text-[12px] sm:text-sm mt-4 text-center">
          <p>{name}</p>
          <p>${unit_amount! / 100}</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;
