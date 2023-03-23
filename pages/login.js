import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      body: formData,
    });
    if (res.status == 200) {
      const json = await res.json();
      localStorage.setItem("token", json.access_token);
      router.push("/admin");
      console.log(json.access_token);
    } else {
      alert("Login failed.");
    }
  }
  return (
    <>
      <div className="bg-200 h-full">
        <div className="my-40 mx-auto max-w-4xl flex justify-around items-center">
          <Image
            priority
            src="/docs-pana.png"
            alt="logo"
            width={500}
            height={500}
          />
          <form
            action="#"
            method="POST"
            onSubmit={handleSubmit}
            className="px-8 py-10 mx-auto w-full bg-white flex flex-col justify-around rounded-xl"
          >
            <h1 className="max-w-lg text-2xl text-left font-bold mx-auto">
              Login
            </h1>
            <p>
              Email <span className="text-red-500">*</span>
            </p>
            <input
              className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
              type="email"
              name="username"
              placeholder="email@example.com"
              required
              value={username}
              onChange={handleUsernameChange}
            ></input>
            <p>
              Mot de pass <span className="text-red-500">*</span>
            </p>
            <input
              className="mb-4 mt-2 px-4 py-2 bg-gray-100 rounded-lg w-full"
              type="password"
              name="password"
              placeholder="********"
              required
              value={password}
              onChange={handlePasswordChange}
            ></input>
            <div className="flex gap-4 items-center justify-between">
              <button
                type="submit"
                className="bg-sky-500 text-white hover:bg-blue-900 transition ease-in-out duration-500 py-2 px-6 rounded-lg"
              >
                Connexion
              </button>

              <Link
                className="text-sm text-gray-400 hover:text-red-500"
                href={`/forgotten`}
                passHref
              >
                Mot de pass oublié?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
