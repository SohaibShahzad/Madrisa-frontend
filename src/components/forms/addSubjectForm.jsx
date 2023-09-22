"use client";

import axios from "axios";
import { useState, useEffect } from "react";

async function addSubjectRequest(data, isEditMode, onSuccess) {
  const url = isEditMode
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/subject/update/${data._id}`
    : `${process.env.NEXT_PUBLIC_SERVER_URL}/subject/create`;
  try {
    const res = await axios.post(url, data);
    onSuccess();
    console.log("success", res);
  } catch (error) {
    console.log("failure", error);
  }
}

export default function AddSubjectForm({ onSubjectAdded, initialData }) {
  const formInputStyle =
    "bg-transparent border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent";
  const initialFormData = {
    code: "",
    name: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ code: "", name: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.code === "" || formData.name === "") {
      alert("Please fill all the fields");
    }
    const isEditMode = !!initialData;
    addSubjectRequest(formData, isEditMode, () => {
      resetForm();
      if (onSubjectAdded) {
        onSubjectAdded();
      }
    });
  };

  return (
    <div className="mb-[10px]">
      <form onSubmit={handleSubmit}>
        <div className="glassmorphism rounded-lg p-5 mt-5">
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Subject Name: </label>

              <input
                className={formInputStyle}
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Subject Code: </label>

              <input
                className={formInputStyle}
                type="text"
                name="code"
                placeholder="Code"
                value={formData.code}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 my-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
