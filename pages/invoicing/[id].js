import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function Consultation({ consultation, id }) {
  const patient_fullname = ` ${consultation.patient.lastname} ${consultation.patient.firstname}`;
  const router = useRouter();

  const submitForm = async (event) => {
    event.preventDefault();
    const patient_id = event.target.patient_id.value;
    const doctor_id = event.target.doctor_id.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/consultations`,
      {
        body: JSON.stringify({
          patient_id: patient_id,
          doctor_id: doctor_id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );
    const result = await res.json();
    console.log(result);
    alert(`Nouvelle consultation enregistré dans la base de donnée.`);
    router.reload();
  };
  return (
    <>
      <div className="text-left h-screen p-8 ">
        <div className="flex justify-between gap-x-4">
          <div className="w-3/6">
            <h1 className="text-lg font-bold">Consultation n° {id}</h1>
            <div className="my-4 grid grid-cols-2 gap-4 ">
              <div
                key={consultation.doctor.id}
                className="p-4 bg-blue-900 text-white text-sm rounded-lg"
              >
                <h2 className=" text-md font-bold">
                  Dr. {consultation.doctor.firstname}
                </h2>
                <h2>Tel: +228 {consultation.doctor.phone}</h2>
                <h2>Specialiste en {consultation.doctor.specialty.name}</h2>
                {/* <h2>{consultation.doctor.experience} ans d'experience</h2> */}
              </div>
              <div
                key={consultation.patient.id}
                className="p-4 bg-sky-500 text-white text-sm rounded-lg"
              >
                <h2 className=" text-md font-bold">
                  {consultation.patient.title} {patient_fullname}
                </h2>
                <h2>Tel: +228 {consultation.patient.tel}</h2>
                <h2>{consultation.patient.age} ans</h2>
                {/* <h2>Email: {consultation.patient.email}</h2>
                <h2>Adresse: {consultation.patient.address}</h2> */}
              </div>
            </div>

            <div>
              <h1 className="pb-4 text-lg font-bold">Paramètres de santé</h1>
              {/* formulaire de parametres de sante */}
              <form
                action="#"
                method="POST"
                onSubmit={submitForm}
                className="p-4 bg-white rounded-2xl w-full"
              >
                <div className="grid grid-cols-4 gap-x-4 text-sm">
                  <div>
                    <p>Temperature</p>
                    <input
                      className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-xs"
                      type="number"
                      name="temperature"
                      placeholder="Temperature"
                    ></input>
                  </div>
                  <div>
                    <p>Poids</p>
                    <input
                      className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-xs"
                      type="number"
                      name="weight"
                      placeholder="Poids"
                    ></input>
                  </div>
                  <div>
                    <p>Tension arterielle</p>
                    <input
                      className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-xs"
                      type="number"
                      name="blodd_pressure"
                      placeholder="Tension arterielle"
                    ></input>
                  </div>
                  <div>
                    <p>Oxymetrie</p>
                    <input
                      className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-xs"
                      type="number"
                      name="oxymetry"
                      placeholder="Oxymetrie"
                    ></input>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-sky-500 text-white hover:bg-blue-900 transition ease-in-out duration-500 py-2 px-6 rounded-xl"
                >
                  Enregistrer
                </button>
              </form>
              {/* patient history */}

              <h1 className="my-4 text-lg font-bold">Historique du patient </h1>
              <div
                key={consultation.id}
                className="p-4 bg-white text-sm  rounded-xl"
              >
                <p>
                  The medical history, case history, or anamnesis of a patient
                  is information gained by a physician by asking specific
                  questions, either to the patient or to other people who know
                  the person and can give suitable information, with the aim of
                  obtaining information useful in formulating a diagnosis and
                  providing medical care to the patient. The medically relevant
                  complaints reported by the patient or others familiar with the
                  patient are referred to as symptoms, in contrast with clinical
                  signs, which are ascertained by direct examination on the part
                  of medical personnel. Most health encounters will result in
                  some form of history being taken. Medical histories vary in
                  their depth and focus. For example, an ambulance paramedic
                  would typically limit their history to important details, such
                  as name, history of presenting complaint, allergies, etc. In
                  contrast, a psychiatric history is frequently lengthy and in
                  depth, as many details about the patient&apos;s life are
                  relevant to formulating a management plan for a psychiatric
                  illness. The information obtained in this way, together with
                  the physical examination, enables the physician and other
                  health professionals to form a diagnosis and treatment plan.
                  If a diagnosis cannot be made, a provisional diagnosis may be
                  formulated, and other possibilities (the differential
                  diagnoses) may be added, listed in order of likelihood by
                  convention. The treatment plan may then include further
                  investigations to clarify the diagnosis.
                </p>
              </div>
            </div>
          </div>

          {/* formulaire de consultaion */}
          <div className=" w-3/6">
            <h1 className="pb-4 text-lg font-bold">
              Formulaire de consultation
            </h1>
            <form
              action="#"
              method="POST"
              onSubmit={submitForm}
              className="p-4 bg-white rounded-2xl w-full"
            >
              {/* text areas */}
              <div className="grid grid-cols-1 gap-x-4">
                <div>
                  <p>Observations</p>
                  <textarea
                    rows="4"
                    cols="50"
                    className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-sm "
                    type="text"
                    name="observations"
                    placeholder="Observations"
                    required
                  ></textarea>
                </div>
                <div>
                  <p>Diagnostic</p>
                  <textarea
                    rows="4"
                    cols="50"
                    className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-sm "
                    type="text"
                    name="diagnosis"
                    placeholder="Diagnostic"
                    required
                  ></textarea>
                </div>
                <div>
                  <p>Tests</p>
                  <textarea
                    rows="2"
                    cols="50"
                    className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-sm "
                    type="text"
                    name="chemical_tests"
                    placeholder="Tests chimiques et parachimiques"
                    required
                  ></textarea>
                </div>

                <div>
                  <p>Traitement</p>
                  <textarea
                    rows="4"
                    cols="50"
                    className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-sm "
                    type="text"
                    name="treatment"
                    placeholder="Traitement"
                    required
                  ></textarea>
                </div>
                <div>
                  <p>Prescription</p>
                  <textarea
                    rows="4"
                    cols="50"
                    className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full text-sm "
                    type="text"
                    name="prescription"
                    placeholder="Prescription"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="bg-sky-500 text-white hover:bg-blue-900 transition ease-in-out duration-500 py-2 px-6 rounded-xl"
              >
                Enregistrer
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Consultation;

export async function getServerSideProps(context) {
  const { params, req } = context;
  console.log(req.headers.cookie);
  const { id } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/consultations/${id}`
  );
  const data = await response.json();

  return { props: { consultation: data, id } };
}
