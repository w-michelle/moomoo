import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full min-h-[100vh]">
      <div className="w-screen h-screen relative">
        <Image
          src="/assets/hero.png"
          alt="hero image"
          fill
          className="object-cover"
        />
      </div>
    </main>
  );
}

{
}
