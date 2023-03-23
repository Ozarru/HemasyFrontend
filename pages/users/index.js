import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";
// import Sidebar from "./../../components/Sidebar";

function UsersList({ users, roles, specs }) {
  const router = useRouter();

  const submitForm = async (event) => {
    event.preventDefault();
    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const address = event.target.address.value;
    const phone = event.target.phone.value;
    const role_id = event.target.role_id.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        address: address,
        phone: phone,
        role_id: role_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await res.json();
    console.log(result);
    alert(
      `L'utilisateur du nom de ${result.lastname} a été enregistré dans la base de donnée.`
    );
    router.reload();
  };
  return (
    <>
      <div className="flex p-4">
        <div className="w-4/6 px-4">
          <h1 className="text-left pb-4 max-w-lg text-lg font-bold">
            Liste des Utilisateurs
          </h1>
          <div className="p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-5 gap-4">
            {Array.from(users)
              .slice(0, 10)
              .map((user) => {
                return (
                  <>
                    <Link href={`users/${user.id}`} passHref>
                      <div
                        key={user.id}
                        className="p-4 bg-white rounded-xl text-black"
                      >
                        <h2 className=" text-md font-bold">{user.lastname}</h2>
                        <h2 className=" text-sm">{user.firstname}</h2>
                        <h2 className="text-xs">
                          {user.role.name.toUpperCase()}
                        </h2>
                      </div>
                    </Link>
                  </>
                );
              })}
          </div>
          {/* rendez-vous table */}
          <h3 className="py-4 text-md font-bold">Table des utilisateurs</h3>
          <div className="overflow-auto rounded-xl bg-white">
            {users.length === 0 ? (
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
                  Aucun Utilisateur
                </h1>
              </div>
            ) : (
              <table className="w-full text-left db-table">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="p-4 text-sm font-se tracking-wide">N°</th>
                    <th className="p-4 text-sm font-se tracking-wide">Nom</th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Prenoms
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">Phone</th>
                    <th className="p-4 text-sm font-se tracking-wide">Email</th>
                    <th className="p-4 text-sm font-se tracking-wide">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(users).map((user) => {
                    // var user_date = new Date(user.date_booked);
                    return (
                      <>
                        <tr className="text-gray-500 hover:text-black text-sm cursor-pointer transition-all duration-50">
                          <td className="p-4">00{user.id}</td>
                          <td className="p-4">{user.lastname}</td>
                          <td className="p-4">{user.firstname}</td>
                          <td className="p-4">{user.phone}</td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">
                            {user.role.name.toUpperCase()}
                          </td>
                          {/* <td className="p-4">{user.specialty.name}</td> */}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="text-left px-4 w-2/6">
          <h1 className="pb-4 text-lg font-bold">
            Formulaire des Utilisateurs
          </h1>
          <form
            action="#"
            method="POST"
            onSubmit={submitForm}
            className="p-4 bg-white text-gray-600 rounded-2xl w-full"
          >
            <div>
              <p>
                Nom <span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="lastname"
                placeholder="Nom"
                required
              ></input>
            </div>
            <div>
              <p>
                Prenoms <span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="firstname"
                placeholder="Prenoms"
                required
              ></input>
            </div>
            <div>
              <p>
                Email <span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="email"
                name="email"
                placeholder="email@example.com"
                required
              ></input>
            </div>
            <div>
              <p>
                Mot de pass <span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="password"
                name="password"
                placeholder="*********"
                required
              ></input>
            </div>
            <div>
              <p>
                Address <span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="address"
                placeholder="105 rue Tokpli"
                required
              ></input>
            </div>
            <div>
              <p>
                Phone <span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="phone"
                placeholder="00-11-22-33"
                required
              ></input>
            </div>
            <div>
              <p>
                Role <span className="text-red-500">*</span>
              </p>
              <select
                type="number"
                name="role_id"
                id="role"
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                required
              >
                <option value=""></option>
                {roles.map((role) => {
                  return (
                    <>
                      <option value={role.id}>{role.name.toUpperCase()}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <div>
              <p>
                Spécialité <span className="text-red-500">*</span>
              </p>
              <select
                type="number"
                name="role_id"
                id="role"
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
              >
                <option value=""></option>
                {specs.map((spec) => {
                  return (
                    <>
                      <option value={spec.id}>{spec.name.toUpperCase()}</option>
                    </>
                  );
                })}
              </select>
            </div>
            {/* <div>
              <p>Subrole <span className="text-red-500">*</span></p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="subrole"
                placeholder="Subrole"
                required
                // value={password}
                // onChange={handlePasswordChange}
              ></input>
            </div>
            <div>
              <p>Specialite <span className="text-red-500">*</span></p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="Specialite"
                placeholder="Specialite"
                required
                // value={password}
                // onChange={handlePasswordChange}
              ></input>
            </div> */}
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
export default UsersList;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const data = await res.json();
  const roles = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/roles`);
  const roles_data = await roles.json();
  const specialties = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/specialties`
  );
  const specs_data = await specialties.json();

  return { props: { users: data, roles: roles_data, specs: specs_data } };
}
