import React, { useState } from "react";
import Header from "./Header";
import Input from "../elements/Input";
import HandleError from "../Handlers/HandleError";
import { getCsrfToken, getStudent, updateBasics } from "../../Redux/StudentApi";
import { CALL_STUDENT_DATA } from "../../Redux/CallReducers";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent } from "../../Redux/Slices/StudentAccount";
import { setFromStorage } from "../../Redux/conditions";

export default function EditProfile() {
  const student = useSelector(CALL_STUDENT_DATA);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nom: student.nom,
    prenom: student.prenom,
    headline: student.headline,
  });
  const [errors, setErrors] = useState({});

  const elements = {
    title: "Edit Profile",
    par: "The Page Editing Or Updating The basics Of The Account",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: student.email,
      ...formData,
    };

    await getCsrfToken();
    await updateBasics(data)
      .then(async (res) => {
        if (res.status == 200) {
          await getStudent().then((response) => {
            console.log(response.data.student)
            dispatch(updateStudent(response.data.student));
            setFromStorage("student", JSON.stringify(response.data.student));
          });
        }
      })
      .catch((err) => {
        if (err?.response?.data) {
          setErrors(err.response.data.errors);
        }
      });
  }

  return (
    <>
      <Header {...elements} />
      <form onSubmit={handleSubmit} className="px-8 grid gap-4">
        <label className="font-semibold">Basics:</label>
        <div className="grid gap-2 ">
          <Input
            addClasses="w-120 lg:w-120 md:w-90"
            label={"Nom"}
            value={formData.nom}
            changeValue={setFormData}
          />
          <HandleError errors={errors} name={"nom"} />
        </div>
        <div className="grid gap-2 ">
          <Input
            addClasses="w-120 lg:w-120 md:w-90"
            label={"Prenom"}
            value={formData.prenom}
            changeValue={setFormData}
          />
          <HandleError errors={errors} name={"prenom"} />
        </div>
        <div className="grid gap-2 ">
          <Input
            addClasses="w-120 lg:w-120 md:w-90"
            label={"Headline"}
            value={formData.headline}
            changeValue={setFormData}
            isLimited={60}
          />
          <HandleError errors={errors} name={"headline"} />
        </div>
        <button className="bg-purple-700 border-2 border-purple-700  text-white font-bold py-3 rounded-lg cursor-pointer transition-all transition-[outline 700ms ease-in] hover:bg-transparent hover:text-gray-900 dark:hover:text-white   ">
          Save
        </button>
      </form>
    </>
  );
}
