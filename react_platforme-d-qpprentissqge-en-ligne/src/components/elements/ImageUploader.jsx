import React, { useState } from "react";
import { getCsrfToken, getStudent, uploadPhoto } from "../../Redux/StudentApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { conditionLogin } from "../../Redux/conditions";

function ImageUploader({ Transition, isPending = false, email }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const nav = useNavigate();
  const dis = useDispatch();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      console.log("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("fr_image", selectedFile);

    Transition(async () => {
      await getCsrfToken();
      await uploadPhoto(formData).then(async (res) => {
        console.log(res)
        await conditionLogin(res, 200, dis, nav);
      });
    });
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium  mb-1">Add / Change Image</label>
      <div className="flex gap-2">
        <input
          type="file"
          id="image-upload"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="image-upload"
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-sm text-gray-500 cursor-pointer"
        >
          {selectedFile ? selectedFile.name : "No file selected"}
        </label>
        <button
          onClick={handleUpload}
          className={
            "bg-purple-700 text-white font-semibold flex gap-2 p-2 rounded cursor-pointer " +
            (isPending ? "pointer-events-none" : "")
          }
        >
          <p>Upload</p> <p>Image</p>
        </button>
      </div>
    </div>
  );
}

export default ImageUploader;
