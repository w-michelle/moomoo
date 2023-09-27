export default function Loading() {
  return (
    <div className="min-h-[100vh] w-full px-8">
      <h1 className="text-2xl mb-4">Flavors</h1>

      <main className="grid grid-cols-2 lg:grid-cols-5 gap-y-6 gap-3 mx-5 mb-8 animate-pulse">
        {Array.from({ length: 10 }, (movie, i) => (
          <div
            key={i}
            className="flex flex-col items-center h-[300px] sm:h-[350px] md:h-[540px] lg:h-[350px] xl:h-[460px]"
          >
            <div className=" bg-grey/40 w-full h-full relative flex flex-col items-center rounded-md"></div>
          </div>
        ))}
      </main>
    </div>
  );
}
