import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";
// import Sidebar from "./../../components/Sidebar";

function Parameters({ users, roles, specs }) {
  class TabData {
    constructor(
      name,
      route
      //  description, icon
    ) {
      this.name = name;
      this.route = route;
      // this.route = description;
      // this.icon = icon;
    }
  }
  const router = useRouter();
  const people_routes = [
    new TabData("Utilisateurs", "users"),
    new TabData("Patients", "patients"),
    new TabData("Specialités", "parameters/specialties"),
    new TabData("Roles d'utilisateurs", "parameters/roles"),
  ];

  const activity_routes = [
    new TabData("Consultations", "parameters/consultations"),
    new TabData("Ordonances", "parameters/prescriptions"),
    new TabData("Traitements", "parameters/treatments"),
    new TabData("Testes", "parameters/tests"),
    new TabData("Thérapies", "parameters/therapies"),
    new TabData("Chirurgies", "parameters/surgeries"),
    new TabData("Ecographies", "parameters/echoes"),
    new TabData("Imageries Medical", "parameters/imageries"),
    new TabData("Actes Medicaux", "parameters/certificates"),
    new TabData("Comptes Rendus", "parameters/stats"),
  ];

  const consumables_routes = [
    new TabData("Inventaire", "parameters/inventory"),
    new TabData("Lots", "parameters/lots"),
    new TabData("Medicaments", "parameters/medications"),
    new TabData("Accessoires", "parameters/accessories"),
  ];

  const structures_routes = [
    new TabData("Chambres", "parameters/rooms"),
    new TabData("Laboratoires", "parameters/laboratoires"),
    new TabData("Bloc Operatoire", "parameters/surgery-theater"),
    new TabData("Infirmerie", "parameters/infirmery"),
  ];

  const finance_routes = [
    new TabData("Assurrances", "parameters/insurrances"),
    new TabData("Facturation", "parameters/invoicing"),
    new TabData("Comptabilité", "parameters/accounting"),
    new TabData("Audit", "parameters/auditing"),
    new TabData("Prestations", "parameters/services"),
    new TabData("Produits", "parameters/products"),
    new TabData("Fiche de Paye", "parameters/payroll"),
    new TabData("Caisses", "parameters/cashdesks"),
  ];

  return (
    <>
      <div className="px-8 pb-4">
        <div className="mb-4  w-full text-sm flex justify-between items-center">
          <div className="w-4/6 p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl">
            <input
              className="px-4 py-2 bg-white rounded-lg w-4/5 text-sm"
              type="text"
              name="query"
              placeholder="Recherchez..."
              required
            ></input>
            <h3 className="text-left text-white pt-10 max-w-lg text-lg font-bold">
              Parametrages des Modules
            </h3>
            <p className="pb-10 text-gray-800 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <Image
            priority
            src="/settings-rafiki.png"
            height={400}
            width={400}
            alt={"settings"}
          />
        </div>
        <div className="mb-8 p-8 bg-blue-900 rounded-3xl">
          <h2 className="text-md font-bold pb-4 text-white">
            Gestion des Personnes
          </h2>
          <div className="mb-4 p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-4 gap-4">
            {people_routes.map((tab) => {
              return (
                <>
                  <Link href={`${tab.route}`} passHref>
                    <h3 className="bg-white hover:bg-blue-900 px-4 py-8 rounded-lg text-center hover:text-white mx-auto transition-all duration-300">
                      {tab.name}
                    </h3>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
        <div className="mb-8 p-8 bg-blue-900 rounded-3xl">
          <h2 className="text-md font-bold pb-4 text-white">
            Gestion des Activités
          </h2>
          <div className="mb-4 p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-5 gap-4">
            {activity_routes.map((tab) => {
              return (
                <>
                  <Link href={`${tab.route}`} passHref>
                    <h3 className="bg-white hover:bg-blue-900 px-4 py-8 rounded-lg text-center hover:text-white mx-auto transition-all duration-300">
                      {tab.name}
                    </h3>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
        <div className="mb-8 p-8 bg-blue-900 rounded-3xl">
          <h2 className="text-md font-bold pb-4 text-white">
            Gestion du Stock (Pharmacie)
          </h2>
          <div className="mb-4 p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-4 gap-4">
            {consumables_routes.map((tab) => {
              return (
                <>
                  <Link href={`${tab.route}`} passHref>
                    <h3 className="bg-white hover:bg-blue-900 px-4 py-8 rounded-lg text-center hover:text-white mx-auto transition-all duration-300">
                      {tab.name}
                    </h3>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
        <div className="mb-8 p-8 bg-blue-900 rounded-3xl">
          <h2 className="text-md font-bold pb-4 text-white">
            Gestion des Structures
          </h2>
          <div className="mb-4 p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-4 gap-4">
            {structures_routes.map((tab) => {
              return (
                <>
                  <Link href={`${tab.route}`} passHref>
                    <h3 className="bg-white hover:bg-blue-900 px-4 py-8 rounded-lg text-center hover:text-white mx-auto transition-all duration-300">
                      {tab.name}
                    </h3>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
        <div className="mb-8 p-8 bg-blue-900 rounded-3xl">
          <h2 className="text-md font-bold pb-4 text-white">
            Gestion des Finances
          </h2>
          <div className="mb-4 p-8 bg-gradient-to-r from-sky-500 to-blue-500 rounded-3xl grid grid-cols-4 gap-4">
            {finance_routes.map((tab) => {
              return (
                <>
                  <Link href={`${tab.route}`} passHref>
                    <h3 className="bg-white hover:bg-blue-900 px-4 py-8 rounded-lg text-center hover:text-white mx-auto transition-all duration-300">
                      {tab.name}
                    </h3>
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
export default Parameters;
