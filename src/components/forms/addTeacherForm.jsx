"use client";

import axios from "axios";
import { useState, useRef } from "react";

async function addTeacherRequest(data, resetForm) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/teacher/register`,
      data
    );
    resetForm();
    console.log("success", res);
  } catch (error) {
    console.log("failure", error);
  }
}

export default function AddTeacherForm() {
  const formInputStyle =
    "bg-transparent border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent";
  const fileInput = useRef();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    address: "",
    image: null,
    education: {
      university: "",
      degree: "",
      year: "",
    },
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if ((file && file.type === "image/jpeg") || file.type === "image/png") {
      reader.onloadend = () => {
        setImageFile(file);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file");
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreviewUrl(null);
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["university", "degree", "year"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        education: {
          ...prev.education,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.phone === "" ||
      formData.address === "" ||
      formData.education.university === "" ||
      formData.education.degree === "" ||
      formData.education.year === ""
    ) {
      return;
    }
    addTeacherRequest(formData, resetForm);
  };

  return (
    <div className="mb-[10px]">
      {/* <h1 className="text-[26px]">Add Teachers</h1> */}
      <form onSubmit={handleSubmit}>
        <div className="glassmorphism rounded-lg p-5 mt-5">
          <h2 className="text-[18px] font-bold tracking-[1px]">
            Personal Details
          </h2>
          <div className="border-[1px]  opacity-50 rounded-full my-5" />
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>First Name: </label>
              <input
                type="text"
                name="firstName"
                placeholder="Abc"
                value={formData.firstName}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Last Name: </label>
              <input
                type="text"
                name="lastName"
                placeholder="Xyz"
                value={formData.lastName}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Email: </label>
              <input
                type="email"
                name="email"
                placeholder="hello@example.com"
                value={formData.email}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Password: </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Phone: </label>
              <input
                type="number"
                name="phone"
                placeholder="+92 123 4567890"
                value={formData.phone}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Date of Birth: </label>
              <input
                type="date"
                name="dob"
                placeholder="+92 123 4567890"
                value={formData.dob}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Address: </label>
              <textarea
                name="address"
                placeholder="Street, City, Country"
                value={formData.address}
                onChange={handleChange}
                className={`${formInputStyle} h-32`}
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Profile Image: </label>
              <img
                src={imagePreviewUrl || "/profile-avatar.png"}
                alt="profile"
                className="mb-2 w-20 h-20 rounded-md object-cover"
              />
              <div className="flex gap-3 pt-2">
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  ref={fileInput}
                />
                <button
                  type="button"
                  onClick={() => fileInput.current.click()}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded transition duration-300"
                >
                  Upload
                </button>
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={!imageFile}
                  className={`py-1 px-4 rounded transition duration-300 ${
                    imageFile
                      ? "bg-red-500 hover:bg-red-700 text-white"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="h-8" />

        <div className="glassmorphism rounded-lg p-5">
          <h2 className="text-[18px] font-bold tracking-[1px]">Education</h2>
          <div className="border-[1px]  opacity-50 rounded-full my-5" />
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>University: </label>
              <input
                type="text"
                name="university"
                placeholder="University of ABC"
                value={formData.education.university}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Degree: </label>
              <input
                type="text"
                name="degree"
                placeholder="BS / MS"
                value={formData.education.degree}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Year: </label>
              <input
                type="text"
                name="year"
                placeholder="2018 - 2022"
                value={formData.education.year}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 my-2">
          {/* <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded transition duration-300"
          >
            Cancel
          </button> */}
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
