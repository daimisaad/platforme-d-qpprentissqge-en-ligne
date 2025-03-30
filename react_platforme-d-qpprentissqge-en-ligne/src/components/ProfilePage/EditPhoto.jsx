import React, { useState, useTransition } from "react";
import { useSelector } from "react-redux";
import { CALL_STUDENT_DATA } from "../../Redux/CallReducers";
import { LoaderCircle } from "lucide-react";
import ImageUploader from "../elements/ImageUploader";
import Header from "./Header";

export default function EditPhoto() {
  const student = useSelector(CALL_STUDENT_DATA);
  const [isPending, startTransition] = useTransition();
  const elements = {
    title:'Edit Photo',
    par:"The Page For Uploding OR Changing The Photo Of The Profile"
  }
  return (
    <>
      <Header {...elements}/>
      <form  className="flex flex-col gap-8 items-center">
        <div className="border-2 relative border-purple-700 p-2 w-70 rounded-full">
          <img
            className="w-full aspect-[1/1] bg-cover rounded-full"
            src={"http://localhost:8000" + student["fr_image"]}
          />
          {isPending && (
            <div className="absolute top-0 left-0 z-10 w-[calc(100%-14px)] h-[calc(100%-14px)] rounded-full translate-x-[7px] translate-y-[7px] bg-gray-400/60 grid   place-content-center">
              <LoaderCircle className="animate-spin text-white" size={"50"} />
            </div>
          )}
        </div>
        <ImageUploader Transition={startTransition} email={student.email} isPending={isPending}/>
      </form>
    </>
  );
}
