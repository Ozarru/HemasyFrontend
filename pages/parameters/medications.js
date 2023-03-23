import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function Medications({ medications, lots }) {
  const router = useRouter();
  const submitForm = async (event) => {
    event.preventDefault();
    const maker = event.target.maker.value;
    const name = event.target.name.value;
    const quantity = event.target.quantity.value;
    const unit_cost = event.target.unit_cost.value;
    const lot_id = event.target.lot_id.value;
    // const date_added = event.target.date_added.value;
    // const produced_on = event.target.produced_on.value;
    // const expires_on = event.target.expires_on.value;
    // const usage = event.target.usage.value;
    let decision = confirm(
      "Voulez vous enregistrer ce type d'medicament dans la base de données?"
    );
    if (decision) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/medications`,
        {
          body: JSON.stringify({
            maker: maker,
            name: name,
            quantity: quantity,
            unit_cost: unit_cost,
            lot_id: lot_id,
            // date_added: date_added,
            // produced_on: produced_on,
            // expires_on: expires_on,
            // usage: usage,
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
      <div className="flex p-4 justify-between">
        {/* listview layout */}
        <div className="w-4/6 px-4">
          <div className="pb-4 flex items-end justify-between">
            <h1 className="text-left max-w-lg text-lg font-bold">
              Nouvel Arrivage
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

          <div className="p-4 bg-gradient-to-l from-sky-500 rounded-3xl">
            {" "}
            {Array.from(medications).length === 0 ? (
              <div className="mx-auto max-w-4xl flex flex-end justify-around items-center">
                <Image
                  className="rounded-lg"
                  priority
                  src="/no-data-pana.png"
                  alt="no fata"
                  width={280}
                  height={280}
                />
                <h1 className="bg-gray-100 p-4 rounded-lg text-center font-light mx-auto">
                  Rien à signaler
                </h1>
              </div>
            ) : (
              <div className=" grid grid-cols-4 gap-4">
                {Array.from(medications)
                  .slice(0, 8)
                  .map((medication) => {
                    return (
                      <>
                        <Link href={`medications/${medication.id}`} passHref>
                          <div className="p-4 bg-gray-100 rounded-lg text-black">
                            <h2 className="text-md font-bold">
                              {medication.name}
                            </h2>
                            <h2 className="p-1 text-sm text-green-500 font-semibold bg-white rounded-lg">
                              {medication.unit_cost} CFA
                            </h2>
                            <p className="my-1 text-sm text-gray-500">
                              {medication.maker}
                            </p>
                            <p className="text-sm text-gray-500">
                              {" "}
                              <span className="px-2 py-1 text-xs text-red-500 font-semibold bg-white rounded-lg">
                                {medication.quantity}
                              </span>{" "}
                              en stock
                            </p>
                          </div>
                        </Link>
                      </>
                    );
                  })}
              </div>
            )}
          </div>
          <h1 className="text-left py-4 max-w-lg text-lg font-bold">
            Table des medicaments
          </h1>
          <div className="overflow-auto rounded-lg bg-white">
            {Array.from(medications).length === 0 ? (
              <div className="mx-auto max-w-4xl flex justify-around items-center">
                <h1 className="bg-gray-100 p-4 rounded-lg text-center font-light mx-auto">
                  Aucun Accessoire trouvé
                </h1>
                <Image
                  className="rounded-lg"
                  priority
                  src="/no-data-pana.png"
                  alt="no fata"
                  width={400}
                  height={400}
                />
              </div>
            ) : (
              <table className="w-full text-left db-table">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="p-4 text-sm font-se tracking-wide">Nom</th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Fabricant
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Prix unitaire
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Quantité
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(medications).map((medication) => {
                    return (
                      <>
                        <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50 text-sm">
                          <td className="bg-ligthest p-3">{medication.name}</td>
                          <td className="bg-ligthest p-3">
                            {medication.maker}
                          </td>
                          <td className="bg-ligthest p-3">
                            {medication.unit_cost}
                          </td>
                          <td className="bg-ligthest p-3">
                            {medication.quantity}
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
          <h1 className="pb-4 text-lg font-bold">Formulaire des medicament</h1>
          <form
            action="#"
            method="POST"
            onSubmit={submitForm}
            className="p-4 bg-white text-gray-600 rounded-2xl w-full"
          >
            <div>
              <p>
                Marque<span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="maker"
                placeholder="nom du frabricant"
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
                placeholder="nom de la medicament"
                required
              ></input>
            </div>
            <div>
              <p>
                Quantité<span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="number"
                name="quantity"
                placeholder="quantité en stock"
                required
              ></input>
            </div>
            <div>
              <p>
                Prix unitaire<span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="number"
                name="unit_cost"
                placeholder="prix unitaire"
                required
              ></input>
            </div>
            <div>
              <p>
                Lot<span className="text-red-500">*</span>
              </p>
              <select
                type="number"
                name="lot_id"
                id="role"
                className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
                required
              >
                <option value=""></option>
                {lots.map((lot) => {
                  return (
                    <>
                      <option value={lot.id}>{lot.name}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <div>
              <p>Produit le</p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="date"
                name="produced_on"
                placeholder="date de production"
              ></input>
            </div>
            <div>
              <p>Expire le</p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="date"
                name="expires_on"
                placeholder="date d'expiration"
              ></input>
            </div>
            <div>
              <p>Usage</p>
              <textarea
                rows="4"
                cols="50"
                className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-sm "
                type="text"
                name="usage"
                placeholder="mode d'utilisation"
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
export default Medications;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/medications`);
  const data = await res.json();
  const lots = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lots`);
  const lot_data = await lots.json();

  return { props: { medications: data, lots: lot_data } };
}
