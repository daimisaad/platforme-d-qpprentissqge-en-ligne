import { createSlice } from "@reduxjs/toolkit";

const darkMode = false;

const ModeSlice = createSlice({
    name:'mode',
    initialState:darkMode,
    reducers:{
        changeMode:(state,action)=>{
            return !state
        }
    }
})

export const {changeMode} = ModeSlice.actions
export default ModeSlice.reducer