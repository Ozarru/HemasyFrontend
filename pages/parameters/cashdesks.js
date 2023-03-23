import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function Cashdesks({ cashdesks }) {
  const router = useRouter();
  const submitForm = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const credit = event.target.credit.value;
    const debit = event.target.debit.value;
    const balance = event.target.balance.value;
    const overview = event.target.overview.value;
    let decision = confirm(
      "Voulez vous enregistrer ce desk dans la base de données?"
    );
    if (decision) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cashdesks`, {
        body: JSON.stringify({
          name: name,
          credit: credit,
          debit: debit,
          balance: balance,
          overview: overview,
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
              Caisses récentes
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

          <div className="p-8 bg-gradient-to-l from-blue-500 to-sky-500 rounded-3xl grid grid-cols-4 gap-4">
            {Array.from(cashdesks).length === 0 ? (
              <div className="mx-auto max-w-4xl flex justify-between items-center">
                <Image
                  className="rounded-lg"
                  priority
                  src="/no-cashdesks_data-pana.png"
                  alt="no fata"
                  width={400}
                  height={400}
                />
                <h1 className="bg-gray-100 p-4 rounded-lg text-center font-light mx-auto">
                  Aucune caisse
                </h1>
              </div>
            ) : (
              Array.from(cashdesks)
                .slice(0, 4)
                .map((e) => {
                  return (
                    <>
                      <div className="p-4 bg-gray-100 rounded-lg text-black">
                        <h2 className="text-md font-bold">{e.name}</h2>
                        <p className="p-1 text-xs bg-white rounded-lg flex justify-between items-center">
                          Solde{" "}
                          <span className=" text-green-600 font-semibold text-sm">
                            {e.balance}
                          </span>
                          CFA
                        </p>
                      </div>
                    </>
                  );
                })
            )}
          </div>
          <h1 className="text-left py-4 max-w-lg text-lg font-bold">
            Table des Caisses
          </h1>
          <div className="overflow-auto rounded-lg bg-white">
            {Array.from(cashdesks).length === 0 ? (
              <div className="mx-auto max-w-4xl flex justify-around items-center">
                <Image
                  className="rounded-lg"
                  priority
                  src="/no-cashdesks_data-pana.png"
                  alt="no fata"
                  width={400}
                  height={400}
                />
                <h1 className="bg-gray-100 p-4 rounded-lg text-center font-light mx-auto">
                  Aucune caisse
                </h1>
              </div>
            ) : (
              <table className="w-full text-left db-table">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="p-4 text-sm font-se tracking-wide">Nom</th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Credits
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Debits
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">Solde</th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Aperçue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(cashdesks).map((desk) => {
                    return (
                      <>
                        <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50 text-sm">
                          <td className="bg-ligthest p-2">{desk.name}</td>
                          <td className="bg-ligthest p-2">{desk.credit}</td>
                          <td className="bg-ligthest p-2">{desk.debit}</td>
                          <td className="bg-ligthest p-2">{desk.balance}</td>
                          <td className="bg-ligthest p-2">{desk.overview}</td>
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
          <h1 className="pb-4 text-lg font-bold">Formulaire des caisses</h1>
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
                placeholder="nom de la caisse"
                required
              ></input>
            </div>
            <div>
              <p>Encaissement</p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="number"
                name="credit"
                placeholder="credit total de la caisse"
                required
              ></input>
            </div>
            <div>
              <p>Decaissement</p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="number"
                name="debit"
                placeholder="debit total de la caisse"
                required
              ></input>
            </div>
            <div>
              <p>Solde</p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="number"
                name="balance"
                placeholder="solde de la caisse"
                required
              ></input>
            </div>
            <div>
              <p>Aperçue</p>
              <textarea
                rows="10"
                cols="50"
                className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-sm "
                type="text"
                name="overview"
                placeholder="aperçue de la caisse"
              ></textarea>
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
export default Cashdesks;

export async function getServerSideProps() {
  const cashdesks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cashdesks`);
  const cashdesks_data = await cashdesks.json();

  return { props: { cashdesks: cashdesks_data } };
}
