import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "../conditions";


const StudentInitial = {
  data: getFromStorage('student',{}),
  isAuthenticated: getFromStorage('auth',false),
};

const StudentSlice = createSlice({
  name: "student",
  initialState: StudentInitial,
  reducers: {
    updateStudent: (state, action) => {
      return { ...state, data: action.payload };
    },
    updateAuth: (state, action) => {
        // console.log(action.payload)
       return {...state,isAuthenticated:action.payload}
    },
    connect: (state, action) => {
      return {...state, isAuthenticated: true, data: action.payload };
    },
    disconnect: (state, action) => {
      return { ...state,data: {}, isAuthenticated: false };
    },
  },
});

export const { connect, disconnect,updateAuth,updateStudent } = StudentSlice.actions;
export default StudentSlice.reducer;
