import Image from "next/image";
import Link from "next/link";
function ConsultationsList({ consultations }) {
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
      this.color = color;
      // this.route = description;
      // this.icon = icon;
    }
  }

  const cons_tiles = [
    new TileData("Consultaions en attentes", 25, "sky-200"),
    new TileData("Consultaions en cours", 15, "yellow-200"),
    new TileData("Consultaions clôturés", 742, "green-200"),
  ];
  return (
    <>
      <div className="grid grid-cols-3 p-4 gap-4">
        {cons_tiles.map((tile) => {
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
export default ConsultationsList;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations`);
  const data = await res.json();

  return { props: { consultations: data } };
}
