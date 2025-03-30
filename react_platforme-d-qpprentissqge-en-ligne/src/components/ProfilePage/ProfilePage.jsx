import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { CALL_STUDENT_DATA } from "../../Redux/CallReducers";
import LinkPage from "./LinkPage";

export default function ProfilePage() {
  const student = useSelector(CALL_STUDENT_DATA);
  const nav = useNavigate();
  const [active, setActive] = useState(location.href.split("/").at(-1));
  function handleActive(path) {
    setActive(path);
    nav(path);
  }
  return (
    <section className="grid grid-rows-[30%_1fr] lg:grid-rows-[70px_1fr_70px] lg:grid-cols-[auto_350px_450px_auto] md:grid-rows-[70px_1fr_70px] md:grid-cols-[auto_250px_350px_auto] gap-2 h-full  ">
      <div className="py-8 lg:py-0 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 flex flex-col gap-2">
        <div className="grid place-items-center gap-1">
          <img
            className="w-30 aspect-[1/1] rounded-full pointer-events-none select-none"
            src={"http://localhost:8000" + student["fr_image"]}
            loading="lazy"
          />
          <h1 className="font-bold">
            {student.prenom} {student.nom}
          </h1>
          <p className="text-gray-400">{student?.headline}</p>
        </div>
        <ul className="flex flex-col gap-1 px-2">
          <LinkPage
            content="Profile"
            to="edit-profile"
            isActive={active}
            setActive={handleActive}
          />
          <LinkPage
            content="Photo"
            to="edit-photo"
            isActive={active}
            setActive={handleActive}
          />
        </ul>
      </div>
      <div className=" md:col-start-3 md:col-end-4 md:row-start-2 md:row-end-3">
        <section className="flex flex-col gap-4">
          <Outlet />
        </section>
      </div>
    </section>
  );
}
