import { Loader } from "lucide-react";
import React, { Children } from "react";

export default function Submit({
  isForSubmit = true,
  outline = false,
  content = null,
  isPendeing = false,
  addClasses = "",
  children,
  ...props
}) {
  return (
    <button
      {...props}
      type={isForSubmit ? "submit" : "button"}
      className={
        "cursor-pointer w-100 border-2 rounded-md border-purple-700 font-bold text-lg p-2 transition-all " +
        (outline
          ? "hover:text-white hover:bg-gray-900 hover:dark:text-gray-900 hover:dark:bg-white "
          : "text-white bg-gray-900 dark:text-gray-900 dark:bg-white  hover:text-gray-900 hover:bg-white hover:dark:text-white hover:dark:bg-gray-900 ") +
        (isPendeing
          ? "pointer-events-none bg-amber-100/10 flex items-center justify-center gap-2 "
          : " ") +
        addClasses
      }
    >
      {isPendeing ? <Loader className="animate-spin" /> : null}

      {isPendeing ? (
        "Loading..."
      ) : (
        <>
          {content}
          {children}
        </>
      )}
    </button>
  );
}
