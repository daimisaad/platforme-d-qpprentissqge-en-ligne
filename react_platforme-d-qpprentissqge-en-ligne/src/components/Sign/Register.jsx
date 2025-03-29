import React, { useState, useTransition } from "react";
import Input from "../elements/Input";
import Submit from "../elements/Submit";
import { Link, useNavigate } from "react-router-dom";
import {
  getCsrfToken,
  getStudent,
  studentRegister,
} from "../../Redux/StudentApi";
import { useDispatch } from "react-redux";
import { updateAuth, updateStudent } from "../../Redux/Slices/StudentAccount";
import { conditionLogin } from "../../Redux/conditions";
import HandleError from "../Handlers/HandleError";

export default function Register() {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fomrRegisted, setFormRegisted] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleLogin = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      await getCsrfToken();
      await studentRegister(fomrRegisted)
        .then(async (res) => {
          conditionLogin(res, 201, dispatch, navigate);
        })

        .catch((err) => {
          if (err?.response?.data) {
            setErrors(err.response.data.errors);
          }
        });
    });
  };
  return (
    <form onSubmit={handleLogin} className="w-full px-4 py-2">
      <div className="grid  lg:grid-cols-2 md:grid-cols-2 gap-4">
        <div className="grid gap-5">
          <div className="grid gap-0.5">
            <Input
              addClasses="w-full"
              label={"Nom"}
              value={fomrRegisted.nom}
              changeValue={setFormRegisted}
            />
            <HandleError errors={errors} name={"nom"} />
          </div>
          <div className="grid gap-0.5">
            <Input
              addClasses="w-full"
              label={"Email"}
              value={fomrRegisted.email}
              changeValue={setFormRegisted}
            />
            <HandleError errors={errors} name={"email"} />
          </div>
        </div>
        <div className="grid gap-5">
          <div className="grid gap-0.5">
            <Input
              addClasses="w-full"
              label={"Prenom"}
              value={fomrRegisted.prenom}
              changeValue={setFormRegisted}
            />
            <HandleError errors={errors} name={"prenom"} />
          </div>
          <div className="grid gap-0.5">
            <Input
            type="password"
              addClasses="w-full"
              label={"Password"}
              value={fomrRegisted.password}
              changeValue={setFormRegisted}
            />
            <HandleError errors={errors} name={"password"} />
          </div>
        </div>
      </div>
      <Submit isPendeing={isPending} content={"register"} addClasses="mt-5 w-full" />
      <Submit isForSubmit={false} outline={true} addClasses="mt-5 w-full">
        <Link to={"/accounts/login"}>If You Already Have Account</Link>
      </Submit>
    </form>
  );
}
