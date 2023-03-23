import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home({ rdvs, docs }) {
  const router = useRouter();
  const [dropdownOpen, setdropdownOpen] = useState(false);

  function toggleDropdown(e) {
    e.name === "dropdownBtn"
      ? ((e.name = "close"), dropdownMenu.classList.remove("hidden"))
      : ((e.name = "dropdownBtn"), dropdownMenu.classList.add("hidden"));
  }

  var pending_rdvs = [];

  Array.from(rdvs).forEach((rdv) => {
    if (rdv.is_pending === true) {
      pending_rdvs.push(rdv);
    }
  });

  const submitForm = async (event) => {
    event.preventDefault();
    const patient_name = event.target.patient_name.value;
    const patient_tel = event.target.patient_tel.value;
    const day = event.target.day.value;
    const time = event.target.time.value;
    const doctor_id = event.target.doctor_id.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
      body: JSON.stringify({
        patient_name: patient_name,
        patient_tel: patient_tel,
        day: day,
        time: time,
        doctor_id: doctor_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const result = await res.json();
    console.log(result);
    alert(`Nouveau rendez-vous enregistrée.`);
    router.reload();
  };

  return (
    <div className="px-8 flex justify-between gap-x-8">
      <div className="w-4/6">
        <div className="flex items-center justify-between">
          <NextLink
            className="bg-blue-900 text-white text-sm py-2 px-4 rounded-lg"
            href="/patients"
            passHref
          >
            + Ajouter un patient
          </NextLink>
          <input
            className="mb-4 mt-2 px-4 py-2 bg-white rounded-lg w-1/2 text-sm"
            type="text"
            name="query"
            placeholder="Recherchez..."
            required
          ></input>
        </div>
        <div className="w-full text-sm flex justify-between items-center">
          <div className="p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl w-4/5">
            <h3 className="text-left text-white pt-10 max-w-lg text-lg font-bold">
              Bonjour Dr. Theo
            </h3>
            <p className="pb-10 text-gray-900 text-sm">
              Passez une bonne journée
            </p>
          </div>
          <Image
            priority
            className="rounded-full"
            src="/docs-pana.png"
            height={220}
            width={220}
            alt={"CIK"}
          />
        </div>

        {/* weekly report section */}
        <h3 className="pb-4 text-md font-bold">Rapport Hebdomadaire</h3>
        <div className="pb-4 grid grid-cols-5 gap-x-6">
          <div className="group bg-white rounded-xl w-full text-sm flex-col text-center">
            <h4 className="py-3 text-gray-400 group-hover:font-bold group-hover:text-black">
              Patients
            </h4>
            <h4 className="py-2 group-hover:bg-sky-500 group-hover:text-white font-bold transition ease-in-out duration-500 text-lg w-full rounded-lg">
              580
            </h4>
          </div>
          <div className="group bg-white rounded-xl w-full text-sm flex-col text-center">
            <h4 className="py-3 text-gray-400 group-hover:font-bold group-hover:text-black">
              Consultations
            </h4>
            <h4 className="py-2 group-hover:bg-sky-500 group-hover:text-white font-bold transition ease-in-out duration-500 text-lg w-full rounded-lg">
              356
            </h4>
          </div>
          <div className="group bg-white rounded-xl w-full text-sm flex-col text-center">
            <h4 className="py-3 text-gray-400 group-hover:font-bold group-hover:text-black">
              Rendez-vous
            </h4>
            <h4 className="py-2 group-hover:bg-sky-500 group-hover:text-white font-bold transition ease-in-out duration-500 text-lg w-full rounded-lg">
              288
            </h4>
          </div>
          <div className="group bg-white rounded-xl w-full text-sm flex-col text-center">
            <h4 className="py-3 text-gray-400 group-hover:font-bold group-hover:text-black">
              Couriers
            </h4>
            <h4 className="py-2 group-hover:bg-sky-500 group-hover:text-white font-bold transition ease-in-out duration-500 text-lg w-full rounded-lg">
              78
            </h4>
          </div>
          <div className="group bg-white rounded-xl w-full text-sm flex-col text-center">
            <h4 className="py-3 text-gray-400 group-hover:font-bold group-hover:text-black">
              Analyses
            </h4>
            <h4 className="py-2 group-hover:bg-sky-500 group-hover:text-white font-bold transition ease-in-out duration-500 text-lg w-full rounded-lg">
              100
            </h4>
          </div>
        </div>

        {/* rendez-vous table */}
        <h3 className="pb-4 text-md font-bold">Mes Rendez-vous</h3>
        <div className="overflow-auto rounded-lg bg-white">
          {pending_rdvs.length === 0 ? (
            <div className="mx-auto max-w-4xl flex justify-around items-center">
              <Image
                className="rounded-lg"
                priority
                src="/no-data-pana.png"
                alt="no fata"
                width={400}
                height={400}
              />
              <h1 className="bg-gray-100 p-4 rounded-lg text-center font-light mx-auto">
                Aucun Rendez-vous en attente
              </h1>
            </div>
          ) : (
            <table className="w-full text-left db-table">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-4 text-sm font-se tracking-wide">Patient</th>
                  <th className="p-4 text-sm font-se tracking-wide">Medecin</th>
                  <th className="p-4 text-sm font-se tracking-wide">
                    Specialité
                  </th>
                  <th className="p-4 text-sm font-se tracking-wide">Date</th>
                  <th className="p-4 text-sm font-se tracking-wide">Heure</th>
                </tr>
              </thead>
              <tbody>
                {pending_rdvs.map((rdv) => {
                  return (
                    <>
                      <tr className="text-gray-500 text-sm hover:text-black cursor-pointer transition-all duration-50">
                        <td className="p-4 font-semibold">
                          {rdv.patient_name}
                        </td>
                        <td className="p-4">Dr. {rdv.doctor.firstname}</td>
                        <td className="p-4">{rdv.doctor.specialty.name}</td>
                        <td className="p-4">
                          {rdv.day}
                          {/* {Date.parse(rdv.date)} */}
                        </td>
                        <td className="p-4 flex justify-between items-center">
                          {rdv.time}
                          <div class="relative inline-block text-left">
                            <td className="p-4">
                              <button
                                type="button"
                                class="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                name="dropdownBtn"
                                id="dropdownBtn"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onclick={() => setdropdownOpen(true)}
                              >
                                ...
                              </button>
                              {/* <div
                                class={`${
                                  dropdownOpen ? `visible` : `hidden`
                                } absolute right-4 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all`}
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabindex="-1"
                                id="dropdownMenu"
                              >
                                <div class="py-1" role="none">
                                  <a
                                    href="#"
                                    class="text-gray-700 block px-4 py-2 text-sm"
                                    role="menuitem"
                                    tabindex="-1"
                                    id="menu-item-0"
                                  >
                                    Modifier
                                  </a>
                                  <a
                                    href="#"
                                    class="text-gray-700 block px-4 py-2 text-sm"
                                    role="menuitem"
                                    tabindex="-1"
                                    id="menu-item-1"
                                  >
                                    Supprimer
                                  </a>
                                </div>
                              </div> */}
                            </td>
                          </div>
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
      {/* formulaire */}
      <div className=" w-2/6">
        <h3 className="pb-4 text-md font-bold">Agenda Hebdomadaire</h3>
        <div className="bg-blue-50 p-4 rounded-lg w-full h-60 text-sm flex-col text-left">
          <h4 className="py-3 font-bold">Calendrier</h4>
        </div>
        <h1 className="py-4 text-md font-bold">Formulaire des Rendez-vous</h1>
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
            <input
              className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
              type="text"
              name="patient_name"
              placeholder="nom et prenoms du patient"
              required
            ></input>
          </div>
          <div>
            <p>
              Telephone <span className="text-red-500">*</span>
            </p>
            <input
              className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
              type="text"
              name="patient_tel"
              placeholder="telephone du patient"
              required
            ></input>
          </div>
          <div>
            <p>
              Date <span className="text-red-500">*</span>
            </p>
            <input
              className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
              type="date"
              name="day"
              placeholder="date du rendez-vous"
              required
            ></input>
          </div>
          <div>
            <p>
              Heure <span className="text-red-500">*</span>
            </p>
            <input
              className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
              type="time"
              name="time"
              placeholder="heure du rendez-vous"
              required
            ></input>
          </div>
          <div>
            <p>
              Medecin <span className="text-red-500">*</span>
            </p>
            <select
              type="number"
              name="doctor_id"
              className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
              required
            >
              <option value=""></option>
              {Array.from(docs).map((doctor) => {
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
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`);
  const appointments = await res.json();
  const docs_data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
  const doctors = await docs_data.json();

  return {
    props: {
      rdvs: appointments,
      docs: doctors,
    },
  };
}
