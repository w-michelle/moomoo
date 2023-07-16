import Image from "next/image";
import React from "react";
import getProducts from "@/util/getProducts";
import Product from "../components/Product";
type Props = {};

const page = async () => {
  const products = await getProducts();

  return (
    <div className="min-h-[100vh] w-full px-8">
      <h1 className="text-2xl mb-4">Flavors</h1>
      <main className="grid grid-cols-2 lg:grid-cols-5 gap-y-6 gap-3 mx-5 mb-8">
        {products.map((product) => (
          <Product key={product.cartItemID} {...product} />
        ))}
      </main>
    </div>
  );
};

export default page;
