"use client";
import { SearchOrderTypes } from "@/types/SearchParamTypes";
import Image from "next/image";
import React, { useEffect } from "react";

type Props = {};

const Page = ({ searchParams }: any) => {
  const products = JSON.parse(searchParams.products);

  return (
    <div className="px-4 overflow-auto h-screen flex flex-col items-center w-full">
      <h1 className="text-2xl mt-6">Order Details</h1>
      <table className="xl:w-8/12 lg:w-10/12 w-full my-4 ">
        <tbody>
          <tr className="text-left">
            <th>Item</th>
            <th className="text-right">Price</th>
            <th className="text-right">Qty</th>
            <th className="text-right">Amount</th>
          </tr>

          {products?.map((item: any) => (
            <tr key={item.id} className="border-b-[1px] border-gray-100 my-4">
              <td className="flex items-center gap-4">
                <div className="w-20 h-20 relative">
                  <Image
                    src={item.image}
                    alt="Product Image"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm">{item.name}</p>
              </td>
              <td className="text-right">$13</td>
              <td className="text-right">{item.quantity}</td>

              <td className="text-right">${13 * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="xl:w-8/12 lg:w-10/12 w-full flex justify-between items-center border-b-[1px] border-gray-100 pb-4">
        <div>
          <p>Subtotal</p>
          <p>Shipping & Handling</p>
        </div>
        <div>
          <p className="text-right">${searchParams.amount / 100}</p>
          <p>FREE</p>
        </div>
      </div>
      <div className="xl:w-8/12 lg:w-10/12 w-full flex justify-between items-center pb-4  mt-4">
        <p className="font-black">Order Total</p>
        <p className="font-black">${searchParams.amount / 100}</p>
      </div>
    </div>
  );
};

export default Page;
