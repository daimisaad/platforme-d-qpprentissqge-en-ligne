import { createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../api/axios";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return "";
  };

const ApiInitial = {
  getCsrfToken: async () => {
    try {
      await axiosClient.get("/sanctum/csrf-cookie");
    } catch (err) {
      console.error("CSRF token fetch failed:", err);
    }
  },
  getStudent: async () => {
    return await axiosClient.get("/api/user");
  },
  studentLogin: async (formData) => {
    return await axiosClient.post("/login", formData, {
      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      withXSRFToken: true,
    });
  },
  studentLogout: async () => {
    await axiosClient.post(
      "/logout",
      {},
      {
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        },
        withXSRFToken: true,
      }
    );
  },
};

const ApisSlice = createSlice({
  name: "apis",
  initialState: ApiInitial,
  reducers: {},
});

export default ApisSlice.reducer;
