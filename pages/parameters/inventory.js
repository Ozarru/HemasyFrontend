import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function Inventory({ medications, lots, accessories }) {
  const router = useRouter();

  class TileData {
    constructor(
      title,
      figure,
      route,
      color
      //  description, icon
    ) {
      this.title = title;
      this.figure = figure;
      this.route = route;
      this.color = color;
      // this.route = description;
      // this.icon = icon;
    }
  }

  const stock_tiles = [
    new TileData("Produits en stock", 2589, "products", "sky-200"),
    new TileData("Produits utilisés", 1153, "products", "yellow-200"),
    new TileData("Produits achetés", 3742, "products", "green-200"),
    new TileData("Produits à acheter", 426, "products", "red-200"),
  ];
  return (
    <>
      <div className="px-8">
        <div className="mb-4  w-full text-sm flex justify-between items-center">
          <div className="w-4/6 p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl">
            <input
              className="px-4 py-2 bg-white rounded-lg w-4/5 text-sm"
              type="text"
              name="query"
              placeholder="Recherchez..."
              required
            ></input>
            <h3 className="text-left text-white pt-10 max-w-lg text-lg font-bold">
              Inventaire des consomables
            </h3>
            <p className="pb-10 text-gray-900 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <Image
            priority
            src="/inventory.png"
            height={340}
            width={340}
            alt={"inventory"}
          />
        </div>
        <div className="mb-4 rounded-3xl grid grid-cols-4 gap-4">
          {stock_tiles.map((tile) => {
            return (
              <>
                <Link
                  href={`${tile.route}`}
                  passHref
                  className={`bg-white w-full hover:bg-${tile.color} p-8 rounded-xl text-center mx-auto transition-all duration-300`}
                >
                  <h3 className="font-black text-3xl">{tile.figure}</h3>
                  <h3 className="text-gray-500">{tile.title}</h3>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Inventory;

export async function getServerSideProps() {
  const accs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accessories`);
  const accs_data = await accs.json();
  const meds = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/medications`);
  const meds_data = await meds.json();
  const lots = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lots`);
  const lot_data = await lots.json();

  return {
    props: { medications: meds_data, lots: lot_data, accessories: accs_data },
  };
}
