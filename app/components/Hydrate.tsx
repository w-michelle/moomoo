"use client";
import { ReactNode, useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

export default function Hydrate({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);

  //Wait till Nextjs rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  return (
    <SessionProvider>
      {isHydrated ? <body className="">{children}</body> : <body></body>}
    </SessionProvider>
  );
}
