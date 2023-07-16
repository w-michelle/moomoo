import React from "react";
import Image from "next/image";
import { SearchParamTypes } from "@/types/SearchParamTypes";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/Redux/features/cartSlice";
import AddCart from "./AddCart";

const page = ({ searchParams }: SearchParamTypes) => {
  const data = { ...searchParams, quantity: 1 };

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center gap-10 mx-5 my-2">
      <div className="w-[200px] h-[300px] md:w-[500px] md:h-[600px]">
        <div className="w-full h-full relative">
          <Image
            src={searchParams.image}
            alt={searchParams.name}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="basis-1/3">
        <h1 className="font-bold text-2xl">{searchParams.name}</h1>
        <p className="text-xl">${searchParams.unit_amount / 100}</p>

        <AddCart {...data} />

        <p className="mt-4 text-[12px] md:text-md">
          {searchParams.description}
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default page;
