import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function PatientsList({ patients }) {
  const router = useRouter();
  const submitForm = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const age = event.target.age.value;
    const gender = event.target.gender.value;
    const civil_status = event.target.civil_status.value;
    const is_inssured = event.target.is_inssured.value;
    // const email = event.target.email.value;
    const tel = event.target.tel.value;
    // const cel = event.target.cel.value;
    // const address = event.target.address.value;
    let decision = confirm(
      "Voulez vous ajouter ce patient dans la base de données?"
    );
    console.log(is_inssured);
    // if (decision) {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
    //     body: JSON.stringify({
    //       title: title,
    //       firstname: firstname,
    //       lastname: lastname,
    //       age: age,
    //       gender: gender,
    //       civil_status: civil_status,
    //       tel: tel,
    //       is_inssured: is_inssured,
    //       // email: email,
    //       // cel: cel,
    //       // address: address,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //   });
    //   // const result = await res.json();
    //   // alert(
    //   //   `Le patient du nom de ${result.lastname} a été enregistré dans la base de donnée.`
    //   // );
    //   router.reload();
    // }
  };
  return (
    <>
      <div className="flex p-4 justify-between">
        {/* listview layout */}
        <div className="w-4/6 px-4">
          <div className="pb-4 flex items-end justify-between">
            <h1 className="text-left max-w-lg text-lg font-bold">
              Patients Recents
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
            {Array.from(patients)
              .slice(10, 15)
              .map((patient) => {
                return (
                  <>
                    <Link href={`patients/${patient.id}`} passHref>
                      <div
                        key={patient.id}
                        className="p-4 bg-white rounded-xl text-black"
                      >
                        <h2 className="text-md font-bold">
                          {patient.lastname}
                        </h2>
                        <h2 className="text-sm font-light">
                          {" "}
                          {patient.firstname}
                        </h2>
                        <h2 className="text-sm">{patient.age} ans</h2>
                        <h2 className="text-sm">
                          Assuré: {patient.is_insurred.toString()}
                        </h2>
                      </div>
                    </Link>
                  </>
                );
              })}
          </div>
          <h1 className="text-left py-4 max-w-lg text-lg font-bold">
            Liste de Patients
          </h1>
          <div className="overflow-auto rounded-xl bg-white">
            <table className="w-full text-center db-table">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-4 text-sm font-se tracking-wide">N°</th>
                  <th className="p-4 text-sm font-se tracking-wide">Nom</th>
                  <th className="p-4 text-sm font-se tracking-wide">Prenoms</th>
                  <th className="p-4 text-sm font-se tracking-wide">Age</th>
                  <th className="p-4 text-sm font-se tracking-wide">Sexe</th>
                  <th className="p-4 text-sm font-se tracking-wide">
                    Assuré(e)
                  </th>
                  <th className="p-4 text-sm font-se tracking-wide">Tel</th>
                  <th className="p-4 text-sm font-se tracking-wide">Adresse</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(patients).map((patient) => {
                  return (
                    <>
                      <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50 text-sm">
                        <td className="bg-ligthest p-3">00{patient.id}</td>
                        <td className="bg-ligthest p-3">{patient.lastname}</td>
                        <td className="bg-ligthest p-3">{patient.firstname}</td>
                        <td className="bg-ligthest p-3">{patient.age} ans</td>
                        <td className="bg-ligthest p-3">{patient.gender}</td>
                        <td className="bg-ligthest p-3">
                          {patient.is_insurred.toString()}
                        </td>
                        {/* <td className="bg-ligthest p-3">{patient.email}</td> */}
                        <td className="bg-ligthest p-3">{patient.tel}</td>
                        <td className="bg-ligthest p-3">{patient.address}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* submission form */}
        <div className="text-left px-4 w-2/6">
          <h1 className="pb-4 text-lg font-bold">Formulaire des Patients</h1>
          <form
            action="#"
            method="POST"
            onSubmit={submitForm}
            className="p-4 bg-white text-gray-600 rounded-2xl w-full"
          >
            <div>
              <p>
                Civilité <span className="text-red-500">*</span>
              </p>
              <select
                name="title"
                id="title"
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                required
              >
                <option value=""></option>

                <option value="Mr.">Monsieur</option>
                <option value="Mrs.">Madame</option>
                <option value="Miss.">Mademoiselle</option>
              </select>
            </div>
            <div>
              <p>
                Nom<span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="lastname"
                placeholder="Nom"
                required
                // value={username}
                // onChange={handleUsernameChange}
              ></input>
            </div>
            <div>
              <p>
                Prenoms<span className="text-red-500">*</span>
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
                Age<span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="number"
                name="age"
                placeholder="Age"
                required
              ></input>
            </div>
            {/* <div>
              <p>Email</p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="email"
                name="Email"
                placeholder="email@example.com"
              ></input>
            </div> */}
            <div>
              <p>
                Sexe<span className="text-red-500">*</span>
              </p>
              <select
                name="gender"
                id="gender"
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                required
              >
                <option value=""></option>
                <option value="M">Masculin</option>
                <option value="F">Feminin</option>
              </select>
            </div>
            <div>
              <p>Situation Matrimonial</p>
              <select
                name="civil_status"
                id="civil_status"
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                required
              >
                <option value=""></option>
                <option value="single">Célibataire</option>
                <option value="married">Marié(e)</option>
              </select>
            </div>
            <div>
              <p>
                Telephone<span className="text-red-500">*</span>
              </p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="tel"
                placeholder="Tel"
                required
              ></input>
            </div>
            <div className="pb-4 w-full flex items-center justify-between">
              <p>Ce patient est assuré</p>
              <input type="checkbox" name="is_inssured" value="TRUE"></input>
            </div>
            {/* <div>
              <p>Cellulaire</p  >
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="cel"
                placeholder="Cel"
              ></input>
            </div>
            <div>
              <p>Address</p>
              <input
                className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                type="text"
                name="address"
                placeholder="105 rue Tokpli"
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
export default PatientsList;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`);
  const data = await res.json();

  return { props: { patients: data } };
}
