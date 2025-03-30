import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "../components/Nav/NavBar";
import Page from "../components/Sign/Page";
import Login from "../components/Sign/Login";
import Home from "../components/Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { CALL_MODE, CALL_STUDENT_AUTH, CALL_STUDENT_DATA } from "../Redux/CallReducers";
import Register from "../components/Sign/Register";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import EditProfile from "../components/ProfilePage/EditProfile";
import EditPhoto from "../components/ProfilePage/EditPhoto";
import { getStudent } from "../Redux/StudentApi";
import { updateStudent } from "../Redux/Slices/StudentAccount";
import { test } from "../Redux/conditions";

export default function LayOuts() {
  const mode = useSelector(CALL_MODE);
  const student = useSelector(CALL_STUDENT_AUTH)
  console.log(mode)
  useEffect(() => {
    if (mode) {
      document.getElementById("root").classList.add("dark");
      return;
    } else {
      document.getElementById("root").classList.remove("dark");
    }
  }, [mode]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<ProfilePage />}>
            <Route path="/profile/edit-profile" element={<EditProfile />}/>
            <Route path="/profile/edit-photo" element={<EditPhoto />}/>
          </Route>
        </Route>
        <Route path="/accounts" element={<Page />}>
          <Route path="/accounts/login" element={<Login />} />
          <Route path="/accounts/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
