import React, { useState, useTransition } from "react";
import Input from "../elements/Input";
import Button from "../elements/Button";
import Submit from "../elements/Submit";
import { axiosClient } from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
// import { CALL_APIS, CALL_STUDENT } from "../../Redux/CallReducers";
// import { updateAuth } from "../../Redux/Slices/StudentAccount";
import { Link, useNavigate } from "react-router-dom";
import { updateAuth, updateStudent } from "../../Redux/Slices/StudentAccount";
import { getCsrfToken, getStudent, studentLogin } from "../../Redux/StudentApi";
import { conditionLogin } from "../../Redux/conditions";
import HandleError from "../Handlers/HandleError";

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({})
    startTransition(async () => {
      await getCsrfToken();
      await studentLogin(formData)
        .then(async (res) => {
          conditionLogin(res, 204, dispatch, navigate);
          navigate('/')
        })
        .catch((err) => {
          if (err?.response?.data) {
            setErrors(err.response.data.errors);
          }
        });
    });
  };
  return (
    <form
      onSubmit={handleLogin}
      className="w-full h-full flex flex-col items-center gap-6"
    >
      <h1 className="text-5xl ">Sign In</h1>
      <div className="grid gap-2">
        <Input
          addClasses="w-100"
          label={"Email"}
          value={formData.email}
          changeValue={setFormData}
        />
        <HandleError errors={errors} name={'email'}/>
      </div>
      <div className="grid gap-2">
      <Input
        addClasses="w-100"
        type="password"
        label={"Password"}
        value={formData.password}
        changeValue={setFormData}
      />
      <HandleError errors={errors} name={'password'}/>
      </div>
      <Submit content={"Login"} isPendeing={isPending} />
      <Submit outline={true} isForSubmit={false}>
        <Link to={"/accounts/register"}>Sign Up</Link>
      </Submit>
    </form>
  );
}
