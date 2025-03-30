import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "../conditions";

const darkMode = getFromStorage('mode',false);

const ModeSlice = createSlice({
    name:'mode',
    initialState:darkMode,
    reducers:{
        changeMode:(state,action)=>{
            localStorage.setItem('mode',!state)
            return !state
        }
    }
})

export const {changeMode} = ModeSlice.actions
export default ModeSlice.reducer