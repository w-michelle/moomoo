"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LuIceCream } from "react-icons/lu";

const Page = () => {
  const [anonUser, setAnonUser] = useState("");
  const { data: session, status } = useSession();
  const route = useRouter();
  useEffect(() => {
    const random = Math.floor(Math.random() * 5000);
    setAnonUser(`anon${random}`);
  }, []);

  const guestSignIn = async () => {
    const res = await fetch("/api/anonregister", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: anonUser }),
    });
    const data = await res.json();
    if (data.user) {
      signIn("credentials", { username: data.user.email });
    } else {
      console.log("check your credentials");
      return null;
    }
  };
  if (session?.user) return route.push("/");

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col items-center gap-6">
      <h1 className="text-4xl mt-4">LOGIN</h1>
      <div className="w-1/2 h-1/2 rounded-lg flex flex-col items-center justify-center gap-4 bg-gray-100 p-10">
        <button
          className="hover:bg-black hover:text-white w-2/3 border-2 border-black py-2 px-6 bg-white flex items-center gap-2"
          onClick={() => guestSignIn()}
        >
          <LuIceCream className="text-xl hover:text-white" />
          GUEST LOGIN
        </button>
        <button
          className="hover:bg-black hover:text-white w-2/3 border-2 border-black py-2 px-6 bg-white flex items-center gap-2"
          onClick={() => signIn("google")}
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Page;
