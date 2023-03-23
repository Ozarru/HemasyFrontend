import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function Specialties({ specs }) {
  const router = useRouter();
  const submitForm = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const description = event.target.description.value;

    let decision = confirm(
      "Voulez vous ajouter cette spécialité a la base de données?"
    );
    if (decision) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/specialties`,
        {
          body: JSON.stringify({
            name: name,
            description: description,
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
            <h1 className="text-left max-w-lg text-md font-bold">
              Specialités recemment ajoutées
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

          <div className="p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-4 gap-2">
            {Array.from(specs)
              .slice(0, 10)
              .map((spec) => {
                return (
                  <>
                    <Link href={`spec/${spec.id}`} passHref>
                      <div className="p-4 bg-gray-100 rounded-xl text-black">
                        <h2 className="text-md font-bold">{spec.name}</h2>
                        <p className="text-xs text-gray-500">
                          {spec.description}
                        </p>
                      </div>
                    </Link>
                  </>
                );
              })}
          </div>
          <h1 className="text-left py-4 max-w-lg text-md font-bold">
            Liste des spécialités
          </h1>
          <div className="overflow-auto rounded-xl bg-white">
            {specs.length === 0 ? (
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
                  Aucun genre de spécialité
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
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec) => {
                    return (
                      <>
                        <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50 text-sm">
                          <td className="bg-ligthest p-3">{spec.name}</td>
                          <td className="bg-ligthest p-3">
                            {spec.description}
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
          <h1 className="pb-4 text-md font-bold">Formulaire des Specialités</h1>
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
                placeholder="nom de la spécialité"
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
                placeholder="description de la spécialité"
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
export default Specialties;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/specialties`);
  const specialties = await res.json();

  return { props: { specs: specialties } };
}
