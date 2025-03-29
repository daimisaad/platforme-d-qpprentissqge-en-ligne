import React, { useEffect, useState } from "react";

export default function Input({
  type = "text",
  label = null,
  value = "",
  changeValue = null,
  addClasses='',
  ...props
}) {
  const [isFocus, setIsFocus] = useState(false);
  function handleChange(e) {
    changeValue((v) => ({ ...v, [e.target.name]: e.target.value }));
  }
  useEffect(() => {
    if (value != "" || (value?.length > 0 && !isFocus)) {
      setIsFocus(true);
    }
  }, [value]);
  return (
    <div
      {...props}
      className={
        "relative transition-all h-fit " +
        (isFocus ? "outline-4 outline-purple-700/20 rounded" : "outline-hidden")
      }
    >
      <label
        className={
          "absolute dark:text-white  font-semibold transition-all top-0 left-2.5 translate-y-[-50%] " +
          (isFocus
            ? "bg-white dark:bg-gray-900  px-2 text-lg text-purple-700"
            : "top-[50%]  text-md")
        }
      >
        {label}
      </label>
      <input
        onChange={handleChange}
        onBlur={value ? null : () => setIsFocus(false)}
        onFocus={value ? null : () => setIsFocus(true)}
        value={value}
        type={type}
        name={label.toLowerCase()}
        className={"border-2 outline-none   border-purple-700 rounded p-2 font-semibold caret-purple-700 " + addClasses}
      />
    </div>
  );
}
