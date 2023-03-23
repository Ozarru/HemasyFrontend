import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";

function Invoices({
  cash_transactions,
  patients,
  comodities,
  tiers,
  cashdesks,
}) {
  const router = useRouter();

  var pending_transactions = [];
  Array.from(cash_transactions).forEach((e) => {
    if (e.balance > 0) {
      pending_transactions.push(e);
    }
  });

  const submitForm = async (event) => {
    event.preventDefault();
    const patient_id = event.target.patient_id.value;
    const comodity_id = event.target.comodity_id.value;
    const tier_id = event.target.insurance_tier_id.value;
    const cashdesk_id = event.target.cashdesk_id.value;
    const genre = event.target.genre.value;
    const amount = event.target.amount.value;
    const paid = event.target.paid.value;
    const due = event.target.due.value;

    let decision = confirm(
      "Voulez vous enregistrer cette Transaction dans la base de données?"
    );
    if (decision) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/patients_cash_transactions`,
        {
          body: JSON.stringify({
            patient_id: patient_id,
            comodity_id: comodity_id,
            tier_id: tier_id,
            cashdesk_id: cashdesk_id,
            genre: genre,
            amount: amount,
            paid: paid,
            due: due,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );
      const result = await res.json();
      console.log(result);
      router.reload();
    }
  };
  return (
    <>
      <div className="text-left px-8 pt-2 ">
        <div className="flex gap-x-4">
          <div className="w-5/6">
            <div className="pb-4 flex items-end justify-between">
              <h1 className="text-left max-w-lg text-lg font-bold">
                Factures non soldées
              </h1>
              <input
                className="px-4 py-2 bg-white rounded-lg w-1/2 text-sm"
                type="text"
                name="query"
                placeholder="Recherchez..."
                required
              ></input>
            </div>
            {pending_transactions.length === 0 ? (
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
                  Aucune facture non soldée
                </h1>
              </div>
            ) : (
              <div className="p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-5 gap-4">
                nothing else to see here
              </div>
            )}

            {/* tableaux de bd */}
            <h1 className="py-4 max-w-lg text-md font-bold">Factures</h1>

            <div className="overflow-auto rounded-xl bg-white">
              <>
                {Array.from(cash_transactions).length === 0 ? (
                  <div className="px-8 mx-auto max-w-4xl flex justify-betzeen items-center">
                    <Image
                      className="rounded-lg"
                      priority
                      src="/no-data-pana.png"
                      alt="no data"
                      width={500}
                      height={500}
                    />
                    <h1 className="bg-gray-100 p-4 rounded-xl text-center font-light mx-auto">
                      Aucune transaction en espèce effectuée
                    </h1>
                  </div>
                ) : (
                  <div>Nothing to see here either</div>
                )}
              </>
            </div>
          </div>
          {/* formulaire */}
          <div className=" w-2/6">
            <h1 className="pb-4 text-lg font-bold">
              Formulaire de facturation
            </h1>
            <form
              action="#"
              method="POST"
              onSubmit={submitForm}
              className="p-4 bg-white text-gray-600 rounded-xl w-full"
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
                  Prestation / Produit <span className="text-red-500">*</span>
                </p>
                <select
                  type="number"
                  name="comodity_id"
                  className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
                  required
                >
                  <option value=""></option>
                  {Array.from(comodities).map((e) => {
                    return (
                      <>
                        <option value={e.id}>
                          {e.name} ({e.price} CFA)
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
              <div>
                <p>Assurance</p>
                <select
                  type="number"
                  name="insurance_tier_id"
                  className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
                >
                  <option value=""></option>
                  {Array.from(tiers).map((e) => {
                    return (
                      <>
                        <option value={e.id}>
                          {e.name}: {e.percentage} %
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
              <div>
                <p>
                  Caisse <span className="text-red-500">*</span>
                </p>
                <select
                  type="number"
                  name="cashdesk_id"
                  className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
                  required
                >
                  <option value=""></option>
                  {Array.from(cashdesks).map((e) => {
                    return (
                      <>
                        <option value={e.id}>{e.name}</option>
                      </>
                    );
                  })}
                </select>
              </div>
              <div>
                <p>
                  Type de transaction <span className="text-red-500">*</span>
                </p>
                <select
                  type="text"
                  name="genre"
                  className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
                  required
                >
                  <option value=""></option>

                  <option value="credit"> Encaissement</option>
                  <option value="debit"> Decaissement</option>
                  <option value="refund"> Remboursement</option>
                </select>
              </div>
              <div>
                <p>Montant</p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                  type="number"
                  name="amount"
                  placeholder="prix de la prestation / produit"
                  disabled
                ></input>
              </div>
              <div>
                <p>
                  Payé<span className="text-red-500">*</span>
                </p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                  type="number"
                  name="paid"
                  placeholder="total payé"
                  required
                ></input>
              </div>
              <div>
                <p>Solde</p>
                <input
                  className="bg-gray-100 mb-4 mt-2 px-4 py-2 rounded-md w-full text-sm"
                  type="number"
                  name="due"
                  placeholder="relicat de la transaction"
                  disabled
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
      </div>
    </>
  );
}
export default Invoices;

export async function getServerSideProps() {
  const patients = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/patients`);
  const patients_data = await patients.json();
  const comodities = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comodities`
  );
  const comodities_data = await comodities.json();
  const cash_transactions = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/patients_cash_transactions`
  );
  const cash_data = await cash_transactions.json();

  const tiers = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/insurance_tiers`
  );
  const tiers_data = await tiers.json();
  const cashdesks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cashdesks`);
  const cashdesks_data = await cashdesks.json();
  return {
    props: {
      patients: patients_data,
      comodities: comodities_data,
      cash_transactions: cash_data,
      tiers: tiers_data,
      cashdesks: cashdesks_data,
    },
  };
}
