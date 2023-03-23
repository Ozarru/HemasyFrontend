import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import next from "next";

export default function Navbar() {
  const router = useRouter();
  return (
    <div>
      <nav className="bg-blue-900 text-white flex py-4 px-8 w-full justify-between items-center text-sm">
        <NextLink className="" href="/" passHref>
          <Image
            priority
            className="rounded-full"
            src="/hem-logo.png"
            height={40}
            width={40}
            alt={"CIK"}
          />
        </NextLink>
        <ul className="flex  justify-between items-center">
          <NextLink className="mx-4" href="/" passHref>
            Acceuill
          </NextLink>
          <NextLink className="mx-4" href="/prescriptions" passHref>
            Prescriptions
          </NextLink>
          <NextLink className="mx-4" href="/consultations" passHref>
            Consultations
          </NextLink>
          <NextLink className="mx-4" href="/patients" passHref>
            Patients
          </NextLink>
          <NextLink className="mx-4" href="/users" passHref>
            Utilisateurs
          </NextLink>
          <NextLink className="mx-4" href="/invoicing" passHref>
            Facturation
          </NextLink>
          <NextLink className="mx-4" href="/parameters" passHref>
            Parametres
          </NextLink>
          <NextLink
            className="bg-sky-500 text-white hover:bg-blue-900 transition ease-in-out duration-500 py-2 px-6 rounded-lg"
            href="/login"
            passHref
          >
            Login
          </NextLink>
        </ul>
      </nav>
    </div>
  );
}
