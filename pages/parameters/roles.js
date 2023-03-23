/* eslint-disable react-hooks/rules-of-hooks */
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function roles({ roles }) {
  const router = useRouter();
  const submitForm = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;

    let decision = confirm(
      "Voulez vous ajouter ce role dans la base de données?"
    );
    if (decision) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`, {
        body: JSON.stringify({
          name: name,
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
            <h1 className="text-left max-w-lg text-md font-bold">
              Roles recemment ajoutées
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

          <div className="p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-4 gap-4">
            {Array.from(roles)
              .slice(0, 8)
              .map((role) => {
                return (
                  <>
                    <Link href={`role/${role.id}`} passHref>
                      <div className="p-4 bg-gray-100 rounded-xl text-black">
                        <h2 className="text-md font-bold">{role.name}</h2>
                        <p className="text-sm text-gray-500">
                          {role.description}
                        </p>
                      </div>
                    </Link>
                  </>
                );
              })}
          </div>
          <h1 className="text-left py-4 max-w-lg text-md font-bold">
            Liste des roles
          </h1>
          <div className="overflow-auto rounded-xl bg-white">
            {roles.length === 0 ? (
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
                    <th className="p-4 text-sm font-se tracking-wide">
                      Permissions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => {
                    return (
                      <>
                        <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50 text-sm">
                          <td className="bg-ligthest p-3">{role.name}</td>
                          <td className="bg-ligthest p-3">
                            {role.description}
                          </td>
                          <td className="bg-ligthest p-3">
                            {role.permissions}
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
          <h1 className="pb-4 text-md font-bold">Formulaire des Roles</h1>
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
                placeholder="nom du role"
                required
              ></input>
            </div>
            <div>
              <p>Description</p>
              <textarea
                rows="5"
                cols="50"
                className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-sm "
                type="text"
                name="description"
                placeholder="description du role"
              ></textarea>
            </div>
            <div>
              <p>Permissions</p>
              <textarea
                rows="5"
                cols="50"
                className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-sm "
                type="text"
                name="description"
                placeholder="permissions du role"
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
export default roles;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`);
  const roles = await res.json();

  return { props: { roles: roles } };
}
