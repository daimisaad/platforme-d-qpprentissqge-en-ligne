import { axiosClient } from "../api/axios";

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return "";
};

const StudentApi = {
  getCsrfToken: async () => {
    try {
      await axiosClient.get("/sanctum/csrf-cookie");
    } catch (err) {
      console.error("CSRF token fetch failed:", err);
    }
  },
  getStudent: async () => {
    return await axiosClient.get("/api/student");
  },
  studentLogin: async (formData) => {
    return await axiosClient.post("/login", formData, {
      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      
    });
  },
  studentLogout: async () => {
    await axiosClient
      .post(
        "/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          },
          
        }
      )
      .catch((err) => {
        console.log(err);
      });
  },
  studentRegister: async (data) => {
    return await axiosClient.post("/register", data, {
      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      
    });
  },
  uploadPhoto: async (data) => {
    return await axiosClient.post("/uploadphoto", data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        Accept: "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        "Content-Type": "multipart/form-data",
      },
      
    });
  },
  updateBasics: async (data) => {
    return await axiosClient.post("/updatebasics", data, {
      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
      },
      
    });
  },
};

export const {
  studentLogout,
  studentLogin,
  getStudent,
  getCsrfToken,
  studentRegister,
  uploadPhoto,
  updateBasics
} = StudentApi;
