import { flavors } from "@/util/flavors";

const Menu = (place: { place: string }) => {
  const location = place.place;
  return (
    <div className="min-h-[100vh] md:flex-row flex flex-col gap-6 md:justify-between mt-20 mx-10">
      {/* legend */}
      <div>
        <p>G - has gluten</p>
        <p>N - has nuts</p>
        <p>V - vegan</p>
      </div>
      {/* scoops */}
      <div className="flex flex-col gap-10">
        <div>
          <h3 className="text-2xl mb-4">SCOOPS</h3>
          {location === "fairview" ? (
            <div>
              {flavors[0].fairview.scoops.map((item) => (
                <p key={item.id}>{item.name}</p>
              ))}
            </div>
          ) : (
            <div>
              {flavors[0].yorkdale.scoops.map((item) => (
                <p key={item.id}>{item.name}</p>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-2xl mb-4">PINTS</h3>
          {flavors[0].pints.map((item) => (
            <p key={item.id}>{item.name}</p>
          ))}
        </div>
      </div>
      {/* pricelist */}
      <div>
        <h3 className="text-2xl mb-4">PRICE LIST</h3>
        <div className="flex flex-col gap-10">
          <div>
            <h4 className="font-extrabold">Ice Cream</h4>

            {flavors[0].pricelist.icecream.map((item) => (
              <p key={item.id}>
                {Object.keys(item)[0]}: {Object.values(item)[0]}
              </p>
            ))}
            {flavors[0].pricelist.cones.map((item) => (
              <p key={item.id}>
                {Object.keys(item)[0]}: {Object.values(item)[0]}
              </p>
            ))}
            {flavors[0].pricelist.packaged.map((item) => (
              <p key={item.id}>
                {Object.keys(item)[0]}: {Object.values(item)[0]}
              </p>
            ))}
          </div>
          <div>
            <h4 className="font-extrabold">Baked Goods</h4>
            {flavors[0].pricelist.baked.map((item) => (
              <p key={item.id}>
                {Object.keys(item)[0]}: {Object.values(item)[0]}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
