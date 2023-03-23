import Image from "next/image";
import Link from "next/link";
function Invoicing({ consultations }) {
  class TileData {
    constructor(
      title,
      figure,
      color
      //  description, icon
    ) {
      this.title = title;
      this.figure = figure;
      this.color = color;
      // this.route = description;
      // this.icon = icon;
    }
  }

  const invoice_tiles = [
    new TileData("Caisses", 3, "sky-200"),
    new TileData("Comptes Mobile Money", 2, "yellow-200"),
    new TileData("Comptes Bancaires", 1, "green-200"),
  ];
  return (
    <>
      <div className="grid grid-cols-3 p-4 gap-4">
        {invoice_tiles.map((tile) => {
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
    </>
  );
}
export default Invoicing;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations`);
  const data = await res.json();

  return { props: { consultations: data } };
}
