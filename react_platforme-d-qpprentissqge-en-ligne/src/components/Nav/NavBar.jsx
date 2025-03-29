import React from "react";
import { Link, Outlet } from "react-router-dom";
import SwitchMode from "./SwitchMode";
import Button from "../elements/Button";
import BurgerMenu from "./BurgerMenu";

export default function NavBar() {
  return (
    <>
      <nav className=" bg-white relative  dark:bg-gray-900 flex items-center justify-between px-16 h-24  shadow-sm shadow-purple-700 ">
      <div className="text-4xl">
        <h1 className="first-letter:text-5xl first-letter:text-purple-700 first-letter:font-semibold dark:text-white">
          OurSite
        </h1>
      </div>
        <BurgerMenu />
    </nav>
      <main className="h-[100%] dark:bg-gray-900 dark:text-white" >
      <Outlet />
      </main>
    </>
  );
}
