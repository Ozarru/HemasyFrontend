import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function ConsultationsList({ consultations, patients, doctors, cons_genres }) {
  const router = useRouter();

  var pending_consultations = [];
  consultations.forEach((consultation) => {
    if (consultation.is_pending === true) {
      pending_consultations.push(consultation);
    }
  });

  var attended_consultations = [];
  consultations.forEach((consultation) => {
    if (consultation.is_pending === false) {
      attended_consultations.push(consultation);
    }
  });

  const submitForm = async (event) => {
    event.preventDefault();
    const patient_id = event.target.patient_id.value;
    const doctor_id = event.target.doctor_id.value;
    const genre_id = event.target.genre_id.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/consultations`,
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
    alert(`Nouvelle consultation enregistrée.`);
    // router.reload();
  };
  return (
    <>
      <div className="text-left px-8 pt-2 ">
        <div className="flex gap-x-4">
          <div className="w-5/6">
            <div className="pb-4 flex items-end justify-between">
              <h1 className="text-left max-w-lg text-lg font-bold">
                Consultations en attentes
              </h1>
              <input
                className="px-4 py-2 bg-white rounded-xl w-1/2 text-sm"
                type="text"
                name="query"
                placeholder="Recherchez..."
                required
              ></input>
            </div>
            {pending_consultations.length === 0 ? (
              <div className="mx-auto grid grid-cols-2 items-center p-2 bg-gradient-to-l from-sky-500 rounded-3xl">
                <Image
                  className="rounded-lg"
                  priority
                  src="/no-data-pana.png"
                  alt="logo"
                  width={300}
                  height={300}
                />
                <h1 className="bg-white p-4 rounded-xl mx-auto">
                  Aucune consultation en attente
                </h1>
              </div>
            ) : (
              <div className="p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-5 gap-4">
                {pending_consultations.map((consultation) => {
                  return (
                    <>
                      <Link href={`consultations/${consultation.id}`} passHref>
                        <div
                          key={consultation.id}
                          className="p-4 bg-white rounded-xl text-black"
                        >
                          <h2 className="text-md font-bold">
                            {consultation.patient.lastname}
                          </h2>
                          <h2 className="text-sm font-light">
                            {consultation.patient.firstname}
                          </h2>
                          {/* <h2>{consultation.date}</h2>
                           */}
                          <h2 className="text-sm font-mono">
                            {" "}
                            Dr. {consultation.doctor.firstname}
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
            <h1 className="pb-4 text-lg font-bold">
              Formulaire de consultation
            </h1>
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
                <p>
                  Type de consultation <span className="text-red-500">*</span>
                </p>
                <select
                  type="number"
                  name="genre_id"
                  className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
                  required
                >
                  <option value=""></option>
                  {Array.from(cons_genres).map((cons_genre) => {
                    return (
                      <>
                        <option value={cons_genre.id}>{cons_genre.name}</option>
                      </>
                    );
                  })}
                </select>
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
                className="bg-sky-500 text-white hover:bg-blue-900 transition ease-in-out duration-500 py-2 px-6 rounded-lg"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>

        {/* tableaux de bd */}
        <h1 className="py-4 max-w-lg text-md font-bold">
          Consultations effectuées
        </h1>

        <div className="overflow-auto rounded-xl bg-white">
          <>
            {Array.from(attended_consultations).length === 0 ? (
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
                  Aucune consultation effectuée
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
                      Medecin
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Type de Consulation
                    </th>
                    <th className="p-4 text-sm font-se tracking-wide">
                      Observations
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(attended_consultations).map((consultation) => {
                    const date_formatter = new Intl.DateTimeFormat(
                      "default"
                      // {
                      //   dateStyle: "short",
                      //   timeStyle: "short",
                      // }
                    );
                    return (
                      <>
                        <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50">
                          <td className="bg-ligthest p-3">
                            #{consultation.id}
                          </td>
                          <td className="bg-ligthest p-3">
                            {consultation.date.toString().split("T")[0]}
                            {/* {date_formatter.format(consultation.date)} */}
                          </td>
                          <td className="bg-ligthest p-3">
                            {consultation.patient.lastname}{" "}
                            {consultation.patient.firstname}
                          </td>
                          <td className="bg-ligthest p-3">
                            Dr. {consultation.doctor.firstname}
                          </td>
                          <td className="bg-ligthest p-3">
                            {consultation.genre.name}
                          </td>
                          <td className="bg-ligthest p-3">
                            {consultation.requested_tests}
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
export default ConsultationsList;

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/consultations`);
  const data = await res.json();
  const patients = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`);
  const patients_data = await patients.json();
  const doctors = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
  const doctors_data = await doctors.json();
  const cons_genres = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/consultation_genres`
  );
  const cons_genres_data = await cons_genres.json();

  return {
    props: {
      consultations: data,
      patients: patients_data,
      doctors: doctors_data,
      cons_genres: cons_genres_data,
    },
  };
}
