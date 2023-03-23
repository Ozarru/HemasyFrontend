import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function User({ user, id, rdvs }) {
  return (
    <>
      <div className="text-left h-screen px-8 ">
        {/* <div class="bg-gradient-to-r from-cyan-500 to-blue-500 h-60 w-full rounded-lg"></div> */}
        <div class="bg-gradient-to-r from-sky-500 h-60 w-full rounded-lg flex flex-row-reverse">
          <Image
            className="rounded-lg"
            priority
            src="/hospital-pana.png"
            alt="no fata"
            width={300}
            height={300}
          />
        </div>

        <div className="flex pt-4 gap-4">
          <div className="w-3/6 text-gray-500">
            <div className="flex bg-white rounded-lg">
              <Image
                className="rounded-lg"
                priority
                src="/doctor.webp"
                alt="no fata"
                width={240}
                height={240}
              />
              <div key={user.id} className="p-4 ">
                <h3 className="text-left pb-2 max-w-lg text-2xl font-bold text-blue-900">
                  {user.lastname} {user.firstname}
                </h3>
                <p>Role: {user.role.name.toUpperCase()}</p>
                {/* <p>{user.subrole.name.toUpperCase()}</p> */}
                <p>{user.is_active}</p>
                {/* <p>Specialité: {user.specialty.name}</p> */}
                <p> {user.address}</p>
                {/* <h2>+228 {user.phone}</p> */}
                <hr></hr>
                <p> Rendez-vous: {user.age}</p>
                <p> Consultattions: {user.age}</p>
                <p> Années d&apos;experience: {user.experience}</p>
              </div>
            </div>
            {/* user stats */}
            <div className="py-4 grid grid-cols-4 gap-x-4 text-black">
              <div className="group bg-white rounded-lg w-full text-sm flex-col text-center">
                <h4 className="py-3 px-2  text-gray-500">Patients</h4>
                <h4 className="py-2 group-hover:bg-sky-500 group-hover:text-white font-bold transition ease-in-out duration-500 text-lg w-full rounded-lg">
                  30
                </h4>
              </div>
              <div className="group bg-white rounded-lg w-full text-sm flex-col text-center">
                <h4 className="py-3 px-2  text-gray-500">Consultations</h4>
                <h4 className="py-2 group-hover:bg-sky-500 group-hover:text-white font-bold transition ease-in-out duration-500 text-lg w-full rounded-lg">
                  54
                </h4>
              </div>
              <div className="group bg-white rounded-lg w-full text-sm flex-col text-center">
                <h4 className="py-3 px-2  text-gray-500">Rendez-vous</h4>
                <h4 className="py-2 group-hover:bg-sky-500 group-hover:text-white font-bold transition ease-in-out duration-500 text-lg w-full rounded-lg">
                  23
                </h4>
              </div>
              <div className="group bg-white rounded-lg w-full text-sm flex-col text-center">
                <h4 className="py-3 px-2  text-gray-500">Couriers</h4>
                <h4 className="py-2 group-hover:bg-sky-500 group-hover:text-white font-bold transition ease-in-out duration-500 text-lg w-full rounded-lg">
                  78
                </h4>
              </div>
            </div>
            {/* rendez-vous table */}
            <div className="py-6 flex items-end justify-between">
              <h1 className="text-left max-w-lg font-bold text-black">
                Mes Rendez-vous
              </h1>
              <input
                className="px-4 py-2 bg-white rounded-lg w-1/2 text-sm"
                type="text"
                name="query"
                placeholder="Recherchez..."
                required
              ></input>
            </div>
            <div className="overflow-auto rounded-lg bg-white">
              {rdvs.length === 0 ? (
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
                      <th className="p-4 text-sm font-se tracking-wide">
                        Patient
                      </th>
                      <th className="p-4 text-sm font-se tracking-wide">
                        Raison
                      </th>
                      <th className="p-4 text-sm font-se tracking-wide">
                        Date
                      </th>
                      <th className="p-4 text-sm font-se tracking-wide">
                        Heure
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rdvs.map((rdv) => {
                      var rdv_date = new Date(rdv.date_booked);
                      return (
                        <>
                          <tr className="text-gray-500 hover:text-black cursor-pointer transition-all duration-50 text-sm">
                            <td className="p-4">{rdv.patient_name}</td>
                            <td className="p-4">{rdv.doctor.specialty.name}</td>
                            <td className="p-4">
                              {rdv.day}
                              {/* {Date.parse(rdv.date)} */}
                            </td>
                            <td className="p-4">
                              {rdv.time}
                              {/* {Date.parse(rdv.date)} */}
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

          <div className="w-4/6">
            <form
              action="#"
              method="POST"
              // onSubmit={submitForm}
              className="p-4 grid grid-cols-3 gap-4 bg-white text-gray-600 rounded-lg w-full"
            >
              <div>
                <p>
                  Nom <span className="text-red-500">*</span>
                </p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                  type="text"
                  name="lastname"
                  placeholder={user.lastname}
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
                  placeholder={user.firstname}
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
                  placeholder={user.email}
                  required
                ></input>
              </div>

              <div>
                <p>Address</p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                  type="text"
                  name="address"
                  placeholder={user.address}
                  required
                ></input>
              </div>
              <div>
                <p>
                  Tel <span className="text-red-500">*</span>
                </p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                  type="text"
                  name="tel"
                  placeholder={user.tel}
                  required
                ></input>
              </div>
              <div>
                <p>
                  Cel <span className="text-red-500">*</span>
                </p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                  type="text"
                  name="cel"
                  placeholder={user.cel}
                  required
                ></input>
              </div>
              <div>
                <p>
                  Experience <span className="text-red-500">*</span>
                </p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                  type="text"
                  name="experience"
                  placeholder={user.experience}
                  required
                ></input>
              </div>
              <div>
                <p>
                  Role Primaire <span className="text-red-500">*</span>
                </p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                  type="text"
                  name="experience"
                  placeholder={user.experience}
                  required
                ></input>
              </div>
              <div>
                <p>
                  Role Secondaire <span className="text-red-500">*</span>
                </p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                  type="text"
                  name="experience"
                  placeholder={user.experience}
                  required
                ></input>
              </div>

              <button
                type="submit"
                className="bg-sky-500 text-white hover:bg-blue-900 transition ease-in-out duration-500 py-2 px-6 rounded-lg"
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

export default User;

export async function getServerSideProps(context) {
  const { params, req } = context;
  console.log(req.headers.cookie);
  const { id } = params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
  );
  const data = await response.json();
  const appointments = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointments`
  );
  const appointment_data = await appointments.json();

  return { props: { user: data, id, rdvs: appointment_data } };
}
