import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SwitchMode from "../Nav/SwitchMode";
import { useSelector } from "react-redux";
import {  CALL_STUDENT_AUTH } from "../../Redux/CallReducers";

export default function Page() {
  const auth = useSelector(CALL_STUDENT_AUTH);
  const nav = useNavigate();
  useEffect(() => {
    if (auth) {
      nav("/");
    }
  }, []);

  return (
    <>
      {auth ? null : (
        <main className="flex justify-center  h-screen dark:bg-gray-900 items-center">
          <div className="lg:w-3xl lg:grid lg:grid-cols-1 lg:grid-rows-[50px_1fr] lg:py-7 lg:px-8 lg:h-130 md:w-3xl md:h-120 w-full h-full sm:w-full sm:h-full sm:flex sm:flex-col sm:justify-center sm:items-center     md:rounded-xl lg:rounded-xl dark:bg-gray-900 dark:text-white md:shadow-md lg:shadow-md shadow-purple-700 ">
            <div className="w-full h-20 px-5 flex items-center justify-between">
              <Link className="border-2 px-2 py-1 border-purple-700 rounded-md font-semibold transition-all hover:bg-gray-900 hover:text-white dark:hover:text-gray-900 dark:hover:bg-white" to={'/'}>Return Home</Link>
              <SwitchMode />
            </div>
            <Outlet />
          </div>
        </main>
      )}
    </>
  );
}
