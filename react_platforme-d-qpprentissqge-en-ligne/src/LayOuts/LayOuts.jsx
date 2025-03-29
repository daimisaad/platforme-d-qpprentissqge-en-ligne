import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "../components/Nav/NavBar";
import Page from "../components/Sign/Page";
import Login from "../components/Sign/Login";
import Home from "../components/Home/Home";
import { useSelector } from "react-redux";
import { CALL_MODE } from "../Redux/CallReducers";
import Register from "../components/Sign/Register";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import EditProfile from "../components/ProfilePage/EditProfile";
import EditPhoto from "../components/ProfilePage/EditPhoto";

export default function LayOuts() {
  const mode = useSelector(CALL_MODE);
  useEffect(() => {
    if (mode) {
      document.getElementById("root").classList.toggle("dark");
      return;
    } else {
      document.getElementById("root").classList.toggle("dark");
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
