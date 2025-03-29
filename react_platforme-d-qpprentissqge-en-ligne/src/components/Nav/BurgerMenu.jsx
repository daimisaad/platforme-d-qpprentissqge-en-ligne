import React, { useState, useEffect } from "react";
import SwitchMode from "./SwitchMode";
import Button from "../elements/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CALL_STUDENT_AUTH } from "../../Redux/CallReducers";
import ProfileDown from "./ProfileDown";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(CALL_STUDENT_AUTH);
  useEffect(() => {
    if (isOpen) {
      document.querySelector(".hide").addEventListener("click", () => {
        setIsOpen(false);
      });
    }
  }, [isOpen]);
  return (
    <div>
      <ul className="hidden  lg:flex lg:relative items-center gap-5 ">
        <li className='relative after:transition-transform after:duration-500 after:ease-in-out after:origin-bottom-right after:content-[""] after:absolute after:left-0 after:bottom-[-10%] after:rounded-md after:h-1 after:w-full after:scale-0 after:bg-purple-700  hover:after:scale-100 hover:after:origin-bottom-left'>
          <Link className="text-lg font-semibold dark:text-white" to="/">
            Home
          </Link>
        </li>
        <li className='relative after:transition-transform after:duration-500 after:ease-in-out after:origin-bottom-right after:content-[""] after:absolute after:left-0 after:bottom-[-10%] after:rounded-md after:h-1 after:w-full after:scale-0 after:bg-purple-700  hover:after:scale-100 hover:after:origin-bottom-left'>
          <Link className="text-lg font-semibold dark:text-white" to="/">
            About Us
          </Link>
        </li>
        <li className='relative after:transition-transform after:duration-700 after:ease-in-out after:origin-bottom-right after:content-[""] after:absolute after:left-0 after:bottom-[-10%] after:rounded-md after:h-1 after:w-full after:scale-0 after:bg-purple-700  hover:after:scale-100 hover:after:origin-bottom-left'>
          <Link className="text-lg font-semibold dark:text-white" to="/">
            Populur Questions
          </Link>
        </li>
        <li>
          {auth ? (
            <ProfileDown />
          ) : (
            <Button>
              <Link className="" to="/accounts/login">
                Login
              </Link>
            </Button>
          )}
        </li>
        <li>
          <SwitchMode />
        </li>
      </ul>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-30 lg:hidden flex justify-center items-center w-8 bg-purple-700 aspect-[1/1] cursor-pointer rounded"
      >
        <span
          className={
            "relative transition-all block h-1 w-[90%]  rounded cursor-pointer  after:content-[''] after:transition-all before:content-[''] before:transition-all before:absolute after:absolute after:w-full before:w-full after:h-full before:h-full before:bg-white after:bg-white before:rounded after:rounded " +
            (isOpen
              ? "bg-purple-700 after:rotate-45  after:top-[0px] before:rotate-[-45deg]  before:bottom-0"
              : "before:bottom-[8px] after:top-[8px] bg-white")
          }
        ></span>
      </div>
      <div
        className={
          "hide absolute z-10   top-0 bg-gray-900/30 " +
          (isOpen ? "w-[100vw] h-[100vh] left-0" : "left-[200%]")
        }
      ></div>
      <ul
        className={
          "burger absolute z-20 top-0 right-0 h-[100vh] shadow-md shadow-purple-700  md:w-[70vw] w-[100vw] lg:translate-x-[100%] bg-white dark:bg-gray-900 transition-all pt-24 " +
          (isOpen ? "flex flex-col" : "translate-x-[100%] hidden")
        }
      >
        <li className="relative py-4 pl-4">
          <Link className="text-lg font-semibold dark:text-white" to="/">
            Home
          </Link>
        </li>
        <li className="relative py-4 pl-4">
          <Link className="text-lg font-semibold dark:text-white" to="/">
            About Us
          </Link>
        </li>
        <li className="relative py-4 pl-4">
          <Link className="text-lg font-semibold dark:text-white" to="/">
            Populur Questions
          </Link>
        </li>
        <li className="py-4 pl-4">
          {auth ? (
            <ProfileDown />
          ) : (
            <Button classes={"w-75"}>
              <Link className="" to="/accounts/login">
                Login
              </Link>
            </Button>
          )}
        </li>
        <li className="py-4 pl-4 w-75">
          <SwitchMode content={true} />
        </li>
      </ul>
    </div>
  );
}
