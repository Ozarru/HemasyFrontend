import React, { useState } from "react";
import classNames from "classNames";
import Image from "next/image";
import Link from "next/link";
import {
  IoMdMedical,
  IoMdMenu,
  IoHome,
  IoMdLogOut,
  IoMdMenut,
} from "react-icons/io";

const menuItems = [
  { id: 1, label: "Home", icon: IoHome, link: "/" },
  { id: 2, label: "Home", icon: IoHome, link: "/" },
  { id: 3, label: "Home", icon: IoHome, link: "/" },
  { id: 4, label: "Home", icon: IoHome, link: "/" },
  { id: 5, label: "Home", icon: IoHome, link: "/" },
];

// const Sidebar = () => {
function Sidebar() {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const navWrapper = classNames(
    "p-4 bg-blue-900 text-white flex flex-col justify-between w-80",
    {
      ["w-60"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );
  const collapsibles = classNames();
  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };
  const toggleSidebar = () => {
    setToggleCollapse(!toggleCollapse);
  };
  return (
    <>
      <div
        className={navWrapper}
        onMouseEnter={onMouseOver}
        onMouseLeave={onMouseOver}
        style={{ transition: "width 300ms cubic-bezier(0.2,0,0,1) 0s" }}
      >
        <div className="px-3 flex flex-col">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-4">
              <Image
                className="rounded-lg"
                src="/logo.jpg"
                alt="logo"
                width={40}
                height={40}
              />
              {/* <span className={classNames("text-lg font-bold")}>CIK</span> */}
            </div>
            {isCollapsible && (
              <button className={collapsibles} onClick={toggleSidebar}>
                <IoMdMenu className="text-2xl" />
              </button>
            )}
          </div>
          {/* ------------------------------nav links-------------------------------------------- */}
          <div className="flex flex-col items-start mt-12 gap-2 justify-evenly">
            <Link
              href={`/`}
              passHref
              className="w-full flex gap-2 hover:bg-lightest hover:text-darkest transition-all ease-in 100ms px-8 py-1 rounded-md"
            >
              <IoMdMedical className="text-2xl" />
              Medic
            </Link>
            <Link
              href={`/login`}
              passHref
              className="w-full flex gap-2 hover:bg-lightest hover:text-darkest transition-all ease-in 100ms px-8 py-1 rounded-md"
            >
              <IoMdLogOut className="text-2xl font-bold" />
              Logout
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Sidebar;
