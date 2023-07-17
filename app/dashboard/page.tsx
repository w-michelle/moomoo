"use client";
import { AddCartType } from "@/types/AddCartType";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
interface Order {
  amount: string;
  createdDate: string;
  currency: string;
  id: string;
  paymentIntentID: string;
  products: AddCartType[];
  status: string;
  userId: string;
}

const Dashboard = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const fetchOrders = async () => {
    const response = await fetch("/api/get-orders");
    const data = await response.json();
    console.log(data);
    return data;
  };

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <div className="min-h-[100vh] flex flex-col items-center justify-center">
        <p>Loading ...</p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!session?.user) return router.push("/");

  return (
    <div className="px-8 overflow-auto min-h-[100vh]">
      <h1 className="text-2xl mt-6">Orders</h1>
      <table className="w-full mt-4 md:text-sm text-[8px]">
        <tbody>
          <tr className="text-left mb-4 border-b-[1px] border-black leading-10">
            <th>Order References</th>
            <th>Status</th>
            <th>Time</th>
            <th>Details</th>
            <th>Total</th>
          </tr>

          {orders?.map((order) => (
            <tr
              key={order.id}
              className="border-b-[1px] border-gray-100 md:leading-[3rem] leading-5"
            >
              <td className="break-words">{order.id}</td>
              <td>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </td>
              <td>{order.createdDate}</td>
              <td>
                <Link
                  href={{
                    pathname: `/details/${order.id}`,
                    query: {
                      ...order,
                      products: JSON.stringify(order.products),
                    },
                  }}
                >
                  <button className="border-[1px] border-black rounded-lg md:px-3 md:text-sm md:py-1 px-1 text-[6px]">
                    View Detail
                  </button>
                </Link>
              </td>
              <td>${Number(order.amount) / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

{
}
