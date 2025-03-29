import { ArrowDown, ChevronDown, LogOut, Settings, User } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateAuth } from "../../Redux/Slices/StudentAccount";
import { studentLogout } from "../../Redux/StudentApi";
import { CALL_STUDENT_DATA } from "../../Redux/CallReducers";
import { conditionLogout } from "../../Redux/conditions";

export default function ProfileDown() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const student = useSelector(CALL_STUDENT_DATA);
  const nav = useNavigate();
  const handleLogout = async () => {
    await studentLogout().then(() => {
      conditionLogout(dispatch, nav);
    });
  };
  const toHide = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };
  const toShow = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };
  return (
    <div
      onMouseEnter={toShow}
      onMouseLeave={toHide}
      className="relative w-fit  dark:text-white"
    >
      <div
        id="close"
        onMouseEnter={toShow}
        onMouseLeave={toHide}
        className="flex items-center justify-center cursor-pointer gap-1"
      >
        {/* <strong>Hassan Ahmid</strong> */}
        <img
          className="w-8 aspect-[1/1] rounded-full"
          src={"http://localhost:8000" + student["fr_image"]}
        />
        <ChevronDown size={"15"} />
      </div>
      <div
        onMouseEnter={toShow}
        onMouseLeave={toHide}
        className="absolute w-full h-5 "
      ></div>
      <ul
        onMouseEnter={toShow}
        onMouseLeave={toHide}
        className={
          "absolute grid  w-fit border-1 bg-white dark:bg-gray-900 dark:text-white  transition-all border-gray-300 rounded-md translate-x-7 top-9 right-0.5 cursor-pointer " +
          (isOpen ? " " : "hidden")
        }
      >
        <li className="px-2 transition-all py-1 w-60 border-b-1 border-gray-300">
          <Link className="flex items-center  gap-4 group my-3 " to={"/profile/edit-profile"}>
            <img
              className="w-16 aspect-[1/1] rounded-full"
              src={"http://localhost:8000" + student["fr_image"]}
            />
            <div className="">
              <h1 className="font-semibold flex flex-nowrap text-lg group-hover:text-purple-700">
                {student["prenom"]} {student["nom"]}
              </h1>
              <p className="mt-[-4px]  text-gray-700 font-[300] text-sm dark:text-gray-300">
                {student["email"]?.length > 10
                  ? student["email"].slice(0, 10) + "..."
                  : student["email"]}
              </p>
            </div>
          </Link>
        </li>

        <li className="px-2 transition-all py-1 hover:bg-purple-400/20 dark:hover:bg-gray-100/20">
          <Link className="flex items-center gap-1.5" to={""}>
            <Settings size={"12"} />
            Settings
          </Link>
        </li>
        <li className="px-2 transition-all py-1 hover:bg-purple-400/20 dark:hover:bg-gray-100/20 ">
          <button
            className="flex items-center gap-1.5 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut size={"12"} />
            Logut
          </button>
        </li>
      </ul>
    </div>
  );
}
