import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function Lots({ lots }) {
  const router = useRouter();
  const submitForm = async (event) => {
    event.preventDefault();
    const number = event.target.number.value;
    const name = event.target.name.value;
    let decision = confirm(
      "Voulez vous enregistrer ce lot dans la base de données?"
    );
    if (decision) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lots`, {
        body: JSON.stringify({
          number: number,
          name: name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = await res.json();
      console.log(result);
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
              Lots récents
            </h1>
            <input
              className="px-4 py-2 bg-white rounded-lg w-1/2 text-sm"
              type="text"
              name="query"
              placeholder="Recherchez..."
              required
            ></input>
          </div>

          {/* <div className="mb-4 mt-2 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl w-full text-sm flex justify-between items-center"></div> */}

          <div className="p-8 bg-gradient-to-r from-sky-500 rounded-3xl grid grid-cols-4 gap-4">
            {Array.from(lots).length === 0 ? (
              <div className="mx-auto max-w-4xl flex justify-around items-center">
                <Image
                  className="rounded-lg"
                  priority
                  src="/no-data-pana.png"
                  alt="no fata"
                  width={400}
                  height={400}
                />
                <h1 className="bg-gray-100 p-4 rounded-lg text-center font-light mx-auto">
                  Aucun lot disponible
                </h1>
              </div>
            ) : (
              Array.from(lots)
                .slice(0, 4)
                .map((lot) => {
                  return (
                    <>
                      <div className="p-4 bg-gray-100 rounded-lg text-black">
                        <h2 className="text-md font-bold">{lot.name}</h2>
                        <h2 className="p-1 text-sm text-blue-600 font-semibold bg-white rounded-lg">
                          Lot N° {lot.number}
                        </h2>

                        {/* <p className="text-sm text-gray-500">
                          {lot.date}
                        </p> */}
                      </div>
                    </>
                  );
                })
            )}
          </div>
          <h1 className="text-left py-4 max-w-lg text-lg font-bold">
            Table des lots
          </h1>
          <div className="overflow-auto rounded-lg bg-white">
            {Array.from(lots).length === 0 ? (
              <div className="mx-auto max-w-4xl flex justify-around items-center">
                <Image
                  className="rounded-lg"
                  priority
                  src="/no-data-pana.png"
                  alt="no fata"
                  width={400}
                  height={400}
                />
                <h1 className="bg-gray-100 p-4 rounded-lg text-center font-light mx-auto">
                  Aucun lot
                </h1>
              </div>
            ) : (
              <table className="w-full text-left db-table">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Numero
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">Nom</th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Date de creation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(lots).map((lot) => {
                    return (
                      <>
                        <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50 text-sm">
                          <td className="bg-ligthest p-2">{lot.number}</td>
                          <td className="bg-ligthest p-2">{lot.name}</td>
                          <td className="bg-ligthest p-2">
                            <td className="bg-ligthest p-2">
                              {lot.date.toString().split("T")[0]}
                            </td>
                            {/* {date_formatter.format(lot.date)} */}
                          </td>
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
          <h1 className="pb-4 text-lg font-bold">
            Formulaire des Types de accessoire
          </h1>
          <form
            action="#"
            method="POST"
            onSubmit={submitForm}
            className="p-4 bg-white text-gray-600 rounded-2xl w-full"
          >
            <div>
              <p>
                Numero<span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="number"
                name="number"
                placeholder="numero du lot"
                required
              ></input>
            </div>

            <div>
              <p>
                Nom<span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="name"
                placeholder="nom du lot"
                required
              ></input>
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
export default Lots;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lots`);
  const data = await res.json();

  return { props: { lots: data } };
}
