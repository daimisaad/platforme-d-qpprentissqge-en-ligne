import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "./Slices/DarkMode";
import studentReducer from "./Slices/StudentAccount";
// import ApisReducer from "./Slices/ApisStudent";
const store = configureStore({
  reducer: {
    mode: modeReducer,
    student: studentReducer,
    // apis:ApisReducer
  },
});

export default store;
