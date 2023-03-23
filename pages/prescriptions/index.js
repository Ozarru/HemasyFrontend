import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   solid,
//   regular,
//   brands,
//   icon,
// } from "@fortawesome/fontawesome-svg-core/import.macro";

function Prescriptionss({ patients, doctors, prescriptions }) {
  const submitForm = async (event) => {
    event.preventDefault();
    const patient_id = event.target.patient_id.value;
    const doctor_id = event.target.doctor_id.value;
    const genre_id = event.target.genre_id.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/prescriptions`,
      {
        body: JSON.stringify({
          patient_id: patient_id,
          doctor_id: doctor_id,
          genre_id: genre_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    const result = await res.json();
    console.log(result);
    alert(`Nouvelle prescription enregistrée.`);
    // router.reload();
  };
  return (
    <>
      <div className="text-left px-8 pt-2 ">
        <div className="flex gap-x-4">
          <div className="w-4/6">
            <div className="pb-4 flex items-end justify-between">
              <h1 className="text-left max-w-lg text-md font-bold">
                Prescriptions en attentes
              </h1>
              <input
                className="px-4 py-2 bg-white rounded-xl w-1/2 text-sm"
                type="text"
                name="query"
                placeholder="Recherchez..."
                required
              ></input>
            </div>
            {Array.from(prescriptions).length === 0 ? (
              <div className="mx-auto grid grid-cols-2 items-center p-2 bg-gradient-to-l from-blue-500 to-sky-500 rounded-3xl">
                <Image
                  className="rounded-lg"
                  priority
                  src="/no-data-pana.png"
                  alt="logo"
                  width={300}
                  height={300}
                />
                <h1 className="bg-white p-4 rounded-xl mx-auto">
                  Aucune prescription en attente
                </h1>
              </div>
            ) : (
              <div className="p-8 bg-gradient-to-r from-sky-500 rounded-3xl grid grid-cols-5 gap-4">
                {/* <FontAwesomeIcon icon={solid("user-secret")} /> */}
                {Array.from(prescriptions).map((prescription) => {
                  return (
                    <>
                      <Link href={`prescriptions/${prescription.id}`} passHref>
                        <div
                          key={prescription.id}
                          className="p-4 bg-white rounded-xl text-black"
                        >
                          <h2 className="text-md font-bold">
                            {prescription.patient.lastname}
                          </h2>
                          <h2 className="text-sm font-light">
                            {prescription.patient.firstname}
                          </h2>
                          {/* <h2>{prescription.date}</h2>
                           */}
                          <h2 className="text-sm font-mono">
                            {" "}
                            Dr. {prescription.doctor.firstname}
                          </h2>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </div>
            )}
          </div>
          {/* formulaire */}
          <div className=" w-2/6">
            <h1 className="pb-4 text-md font-bold">Ajouter une prescription</h1>
            <form
              action="#"
              method="POST"
              onSubmit={submitForm}
              className="p-4 bg-white text-gray-600 rounded-2xl w-full"
            >
              <div>
                <p>
                  Patient <span className="text-red-500">*</span>
                </p>
                <select
                  type="number"
                  name="patient_id"
                  className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
                  required
                >
                  <option value=""></option>
                  {Array.from(patients).map((patient) => {
                    return (
                      <>
                        <option value={patient.id}>
                          {patient.lastname} {patient.firstname}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>

              <div>
                <p>Motif</p>
                <textarea
                  rows="4"
                  cols="50"
                  className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-sm "
                  type="text"
                  name="motive"
                  placeholder="motif de la prescrition"
                  required
                ></textarea>
              </div>
              <div>
                <p>
                  Traitement <span className="text-red-500">*</span>
                </p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                  type="text"
                  name="treatment"
                  placeholder="date du rendez-vous"
                  required
                ></input>
              </div>
              <div>
                <p>
                  Medecin<span className="text-red-500">*</span>
                </p>
                <select
                  type="number"
                  name="doctor_id"
                  className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
                  required
                >
                  <option value=""></option>
                  {Array.from(doctors).map((doctor) => {
                    return (
                      <>
                        <option value={doctor.id}>
                          {doctor.lastname} {doctor.firstname}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>

              <button
                type="submit"
                className="bg-sky-500 text-white hover:bg-blue-900 transition ease-in-out duration-500 py-2 px-6 rounded-xl"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>

        {/* tableaux de bd */}
        <h1 className="py-4 max-w-lg text-md font-bold">
          Prescriptions effectuées
        </h1>

        <div className="overflow-auto rounded-xl bg-white">
          <>
            {Array.from(prescriptions).length === 0 ? (
              <div className="mx-auto max-w-4xl flex justify-around items-center">
                <Image
                  className="rounded-lg"
                  priority
                  src="/no-data-pana.png"
                  alt="no data"
                  width={500}
                  height={500}
                />
                <h1 className="bg-gray-100 p-4 rounded-xl text-center font-light mx-auto">
                  Aucune prescription effectuée
                </h1>
              </div>
            ) : (
              <table className="w-full text-left db-table">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="p-4 text-sm font-se tracking-wide">N°</th>
                    <th className="p-4 text-sm font-se tracking-wide">Date</th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Patient
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Traitement
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Medecin
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(prescriptions).map((prescription) => {
                    return (
                      <>
                        <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50">
                          <td className="bg-ligthest p-3">
                            000{prescription.id}
                          </td>
                          <td className="bg-ligthest p-3">
                            {prescription.date.toString()}
                          </td>
                          <td className="bg-ligthest p-3">
                            {prescription.patient.firstname}
                          </td>
                          <td className="bg-ligthest p-3">
                            {prescription.history}
                          </td>
                          <td className="bg-ligthest p-3">
                            Dr. {prescription.doctor.firstname}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        </div>
      </div>
    </>
  );
}
export default Prescriptionss;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prescriptions`);
  const data = await res.json();
  const patients = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`);
  const patients_data = await patients.json();
  const doctors = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
  const doctors_data = await doctors.json();

  return {
    props: {
      prescriptions: data,
      patients: patients_data,
      doctors: doctors_data,
    },
  };
}
