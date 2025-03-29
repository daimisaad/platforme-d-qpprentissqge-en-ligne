import { MoonIcon, SunIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../../Redux/Slices/DarkMode";

export default function SwitchMode({content=false}) {
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  function change() {
    dispatch(changeMode());
  }
  return (
      <button
        onClick={change}
        className={"flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900  p-2 cursor-pointer hover:bg-gray-700 dark:hover:bg-[#ffffffc9] " + (content ? 'rounded p-2 w-75': 'rounded-full')}
      >
        {mode ? <SunIcon size={"20px"} />  : <MoonIcon size={"20px"} /> } {content && (mode ? 'dark' : 'light')}
      </button>
  );
}
