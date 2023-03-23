import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "./Navbar";
// import { useSession } from "next-auth/client";

// export function Layout({ children }) {
export default function Layout({ children }) {
  // const [session, loading] = useSession();
  // console.log({ session, loading });
  return (
    <div className="min-h-screen max-w-7xl mx-auto bg-gray-200">
      <Navbar />

      {/* {children} */}
      <div className="mt-2 h-full">{children}</div>
    </div>
    // <div className="h-full max-w-7xl flex flex-row mx-auto bg-gray-200">
    //   <Sidebar />
    //   {/* <div
    //     type="button"
    //     class="mb-4 bg-gradient-to-r from-blue-500 h-10 w-full "
    //   ></div> */}
    //   <div className="w-full">
    //     <Navbar />
    //     {children}
    //   </div>
    // </div>
  );
}
