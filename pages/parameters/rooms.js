import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function Rooms({ rooms }) {
  const router = useRouter();
  const submitForm = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const price = event.target.price.value;
    const parameters = event.target.parameters.value;
    let decision = confirm(
      "Voulez vous ajouter ce type de chambre a la base de données?"
    );
    if (decision) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`, {
        body: JSON.stringify({
          name: name,
          price: price,
          parameters: parameters,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = await res.json();
      router.reload();
    }
  };
  return (
    <>
      <div className="flex p-4 justify-between">
        {/* listview layout */}
        <div className="w-4/6 px-4">
          <div className="pb-4 flex items-end justify-between">
            <h1 className="text-left max-w-lg text-lg font-bold">
              Chambres Libres
            </h1>
            <input
              className="px-4 py-2 bg-white rounded-xl w-1/2 text-sm"
              type="text"
              name="query"
              placeholder="Recherchez..."
              required
            ></input>
          </div>

          {/* <div className="mb-4 mt-2 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl w-full text-sm flex justify-between items-center"></div> */}

          <div className="p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-4 gap-4">
            {Array.from(rooms).map((room) => {
              return (
                <>
                  <Link href={`room/${room.id}`} passHref>
                    <div className="p-4 bg-gray-100 rounded-xl text-black">
                      <h2 className="text-md font-bold">{room.name}</h2>
                      <h2 className="p-1 text-sm text-green-500 font-semibold bg-white rounded-lg">
                        {room.price} CFA / jour
                      </h2>
                      <p className="text-sm text-gray-500">{room.genre}</p>
                    </div>
                  </Link>
                </>
              );
            })}
          </div>
          <h1 className="text-left py-4 max-w-lg text-lg font-bold">
            Liste des types de rooms
          </h1>
          <div className="overflow-auto rounded-xl bg-white">
            {Array.from(rooms).length === 0 ? (
              <div className="mx-auto max-w-4xl flex justify-around items-center">
                <Image
                  className="rounded-lg"
                  priority
                  src="/no-data-pana.png"
                  alt="no fata"
                  width={400}
                  height={400}
                />
                <h1 className="bg-gray-100 p-4 rounded-xl text-center font-light mx-auto">
                  Aucun chambre
                </h1>
              </div>
            ) : (
              <table className="w-full text-left db-table">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="p-4 text-sm font-se tracking-wide">Nom</th>
                    <th className="p-4 text-sm font-se tracking-wide">Prix</th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Type de chambre
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">Lits</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(rooms).map((room) => {
                    return (
                      <>
                        <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50 text-sm">
                          <td className="bg-ligthest p-3">{room.name}</td>
                          <td className="bg-ligthest p-3">{room.price}</td>
                          <td className="bg-ligthest p-3">{room.genre}</td>
                          <td className="bg-ligthest p-3">{room.beds}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {/* submission form */}
        <div className="text-left px-4 w-2/6">
          <h1 className="pb-4 text-lg font-bold">Ajouter une chambre</h1>
          <form
            action="#"
            method="POST"
            onSubmit={submitForm}
            className="p-4 bg-white text-gray-600 rounded-2xl w-full"
          >
            <div>
              <p>
                Nom<span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="name"
                placeholder="nom de la chambre"
                required
              ></input>
            </div>
            <div>
              <p>
                Prix<span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="number"
                name="price"
                placeholder="prix de la chambre"
                required
              ></input>
            </div>
            <div>
              <p>Lits</p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="number"
                name="beds"
                placeholder="nombre de lits"
                required
              ></input>
            </div>
            <div>
              <p>Typed de chambre</p>
              <select
                type="number"
                name="genre"
                className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
                required
              >
                <option value=""></option>
                <option value="confort">Multiples usager</option>
                <option value="premium">Unique usager</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-sky-500 text-white hover:bg-blue-900 transition ease-in-out duration-500 py-2 px-6 rounded-lg"
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Rooms;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/rooms`);
  const rooms = await res.json();

  return { props: { rooms: rooms } };
}
