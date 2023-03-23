import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function Insurances({ insurances, tiers }) {
  const router = useRouter();

  const submitForm = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const overview = event.target.overview.value;
    let decision = confirm(
      "Voulez vous ajouter cette assurance dans la base de données?"
    );
    if (decision) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insurances`, {
        body: JSON.stringify({
          name: name,
          overview: overview,
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

  const submitForm2 = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const insurance_id = event.target.insurance_id.value;
    const percentage = event.target.percentage.value;
    const ceiling = event.target.ceiling.value;
    const custom_price = event.target.custom_price.value;
    const overview = event.target.overview.value;
    let decision = confirm(
      "Voulez vous ajouter cette assurance dans la base de données?"
    );
    if (decision) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/insurance_tiers`,
        {
          body: JSON.stringify({
            name: name,
            insurance_id: insurance_id,
            percentage: percentage,
            ceiling: ceiling,
            custom_price: custom_price,
            overview: overview,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
      const result = await res.json();
      router.reload();
    }
  };
  return (
    <>
      <div className="">
        <div className="flex flex-row justify-between p-4">
          {/* listview layout */}
          <div className="w-4/6 px-4">
            <div className="pb-4 flex items-end justify-between">
              <h1 className="text-left max-w-lg text-lg font-bold">
                Assurances Frequentes
              </h1>
              <input
                className="px-4 py-2 bg-white rounded-lg w-1/2 text-sm"
                type="text"
                name="query"
                placeholder="Recherchez..."
                required
              ></input>
            </div>

            <div className="p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-5 gap-4">
              {Array.from(insurances)
                .slice(0, 10)
                .map((insurer) => {
                  return (
                    <>
                      <Link href={`ins/${insurer.id}`} passHref>
                        <div className="p-4 bg-gray-100 rounded-xl text-black text-center">
                          <h2 className="text-md font-bold">{insurer.name}</h2>
                        </div>
                      </Link>
                    </>
                  );
                })}
            </div>
            <h1 className="text-left py-4 max-w-lg text-lg font-bold">
              Liste des Assurances
            </h1>
            <div className="overflow-auto rounded-xl bg-white">
              {Array.from(insurances).length === 0 ? (
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
                    Aucun Assurrance
                  </h1>
                </div>
              ) : (
                <table className="w-full text-left db-table">
                  <thead className="bg-blue-900 text-white">
                    <tr>
                      <th className="p-4 text-sm font-se tracking-wide">Nom</th>
                      <th className="p-4 text-sm font-se tracking-wide">
                        Aperçue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(insurances).map((insurer) => {
                      return (
                        <>
                          <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50 text-sm">
                            <td className="bg-ligthest p-3">{insurer.name}</td>
                            <td className="bg-ligthest p-3">
                              {insurer.overview}
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
            <h1 className="pb-4 text-lg font-bold">Ajouter une Assurance</h1>
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
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-xs"
                  type="text"
                  name="name"
                  placeholder="nom de la compagnie d'assurance"
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
                  placeholder="aperçue de la compagnie d'assurance"
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

        <div className="mt-10 px-4 py-8 flex flex-row justify-between bg-blue-300">
          <div className="w-4/6 px-4">
            <div className="pb-4 flex items-end justify-between">
              <h1 className="text-left max-w-lg text-lg font-bold">
                Tiers Frequentes
              </h1>
              <input
                className="px-4 py-2 bg-white rounded-lg w-1/2 text-sm"
                type="text"
                name="query"
                placeholder="Recherchez..."
                required
              ></input>
            </div>

            <div className="p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-5 gap-4">
              {Array.from(tiers)
                .slice(0, 10)
                .map((e) => {
                  return (
                    <>
                      <Link href={`ins/${e.id}`} passHref>
                        <div className="p-3 bg-gray-100 rounded-xl text-black">
                          <h2 className="text-md font-bold">{e.name}</h2>
                          <p className=" text-sm text-gray-500 text-left">
                            {" "}
                            <span className="px-2 py-1 text-xs text-red-500 font-semibold bg-white rounded-lg">
                              {e.ceiling}
                            </span>{" "}
                            CFA
                          </p>
                        </div>
                      </Link>
                    </>
                  );
                })}
            </div>

            <h1 className="text-left py-4 max-w-lg text-lg font-bold">
              Liste des Tiers
            </h1>
            <div className="overflow-auto rounded-xl bg-white">
              {Array.from(tiers).length === 0 ? (
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
                    Aucun Assurrance
                  </h1>
                </div>
              ) : (
                <table className="w-full text-left db-table">
                  <thead className="bg-blue-900 text-white">
                    <tr>
                      <th className="p-4 text-sm font-se tracking-wide">Nom</th>
                      <th className="p-4 text-sm font-se tracking-wide">
                        Taux de couverture
                      </th>
                      <th className="p-4 text-sm font-se tracking-wide">
                        Plafond
                      </th>
                      <th className="p-4 text-sm font-se tracking-wide">
                        Prix assusrance
                      </th>
                      <th className="p-4 text-sm font-se tracking-wide">
                        Aperçue
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(tiers).map((e) => {
                      return (
                        <>
                          <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50 text-sm">
                            <td className="bg-ligthest p-3">{e.name}</td>
                            <td className="bg-ligthest p-3">{e.percentage}</td>
                            <td className="bg-ligthest p-3">{e.ceiling}</td>
                            <td className="bg-ligthest p-3">
                              {e.custom_price}
                            </td>
                            <td className="bg-ligthest p-3">{e.overview}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {/* tier form */}
          <div className="text-left px-4 w-2/6">
            <h1 className="pb-4 text-lg font-bold">Ajouter un tier</h1>
            <form
              action="#"
              method="POST"
              onSubmit={submitForm2}
              className="p-4 bg-white text-gray-600 rounded-2xl w-full"
            >
              <div>
                <p>
                  Assurance <span className="text-red-500">*</span>
                </p>
                <select
                  type="number"
                  name="insurance_id"
                  className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
                  required
                >
                  <option value=""></option>
                  {Array.from(insurances).map((e) => {
                    return (
                      <>
                        <option value={e.id}>{e.name}</option>
                      </>
                    );
                  })}
                </select>
              </div>
              <div>
                <p>
                  Nom<span className="text-red-500">*</span>
                </p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-xs"
                  type="text"
                  name="name"
                  placeholder="nom du tier d'assurance"
                  required
                ></input>
              </div>
              <div>
                <p>
                  Taux de couverture<span className="text-red-500">*</span>
                </p>

                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-xs"
                  type="number"
                  name="percentage"
                  placeholder="pourcentage du tier d'assurance"
                  required
                ></input>
              </div>
              <div>
                <p>
                  Plafond<span className="text-red-500">*</span>
                </p>

                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-xs"
                  type="number"
                  name="ceiling"
                  placeholder="montant maximal  du tier d'assurance"
                  required
                ></input>
              </div>
              <div>
                <p>
                  Prix Assurance<span className="text-red-500">*</span>
                </p>

                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-xs"
                  type="number"
                  name="custom_price"
                  placeholder="prix d'assurance"
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
                  placeholder="aperçue du tier d'assurance"
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
      </div>
    </>
  );
}
export default Insurances;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/insurances`);
  const insurances = await res.json();
  const tiers = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/insurance_tiers`
  );
  const tiers_data = await tiers.json();

  return { props: { insurances: insurances, tiers: tiers_data } };
}
