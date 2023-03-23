import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function Services({ services }) {
  const router = useRouter();
  const submitForm = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const genre = "service";
    const price = event.target.price.value;
    const description = event.target.description.value;
    let decision = confirm(
      "Voulez vous ajouter cette prestation dans la base de données?"
    );
    if (decision) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comodities`, {
        body: JSON.stringify({
          name: name,
          genre: genre,
          price: price,
          description: description,
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
              Prestations Frequentes
            </h1>
            <input
              className="px-4 py-2 bg-white rounded-xl w-1/2 text-sm"
              type="text"
              name="query"
              placeholder="Recherchez..."
              required
            ></input>
          </div>

          <div className="p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-5 gap-4">
            {Array.from(services)
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
                            {e.price}
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
            Liste des Prestations
          </h1>
          <div className="overflow-auto rounded-xl bg-white">
            {Array.from(services).length === 0 ? (
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
                  Aucune Prestation
                </h1>
              </div>
            ) : (
              <table className="w-full text-left db-table">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="p-4 text-sm font-se tracking-wide">Nom</th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Description
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(services).map((e) => {
                    return (
                      <>
                        <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50 text-sm">
                          <td className="bg-ligthest p-3">{e.name}</td>
                          <td className="bg-ligthest p-3">{e.description}</td>
                          <td className="bg-ligthest p-3">{e.price}</td>
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
          <h1 className="pb-4 text-lg font-bold">Ajouter une Prestation</h1>
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
                placeholder="nom de la prestation"
                required
              ></input>
            </div>
            <div>
              <p>Description</p>
              <textarea
                rows="10"
                cols="50"
                className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-sm "
                type="text"
                name="description"
                placeholder="description de la prestation"
              ></textarea>
            </div>
            <div>
              <p>
                Prix<span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="number"
                name="price"
                placeholder="prix de la prestation"
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
export default Services;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comodities`);
  const comodities = await res.json();
  let services = [];
  Array.from(comodities).forEach((e) => {
    if (e.genre === "service") {
      services.push(e);
    }
  });

  return { props: { services: services } };
}
