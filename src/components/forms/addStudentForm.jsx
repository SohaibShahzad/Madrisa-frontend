"use client";

import axios from "axios";
import { useState, useRef, useEffect } from "react";

async function addOrUpdateStudentRequest(data, isEditMode, onSuccess) {
  const url = isEditMode
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/student/update/${data._id}`
    : `${process.env.NEXT_PUBLIC_SERVER_URL}/student/register`;
  try {
    const res = await axios.post(url, data);
    onSuccess();
    console.log("success", res);
  } catch (error) {
    console.log("failure", error);
  }
}

export default function AddStudentForm({ onStudentsAdded, initialData }) {
  const formInputStyle =
    "bg-transparent border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent";
  const fileInput = useRef();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [genderOptions] = useState(["Male", "Female", "Other"]);
  const initialFormData = {
    firstName: "",
    lastName: "",
    gender: "",
    rollNo: "",
    grade: "",
    section: "",
    dob: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    image: null,
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      // setImagePreviewUrl(initialData.image);
    }
  }, [initialData]);

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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.rollNo === "" ||
      formData.dob === "" ||
      formData.phone === "" ||
      formData.address === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.gender === "" ||
      formData.grade === "" ||
      formData.section === ""
    ) {
      return;
    }
    const isEditMode = !!initialData;
    addOrUpdateStudentRequest(formData, isEditMode, () => {
      resetForm();
      if (onStudentsAdded) onStudentsAdded();
    });
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
              <label>Gender: </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={formInputStyle}
              >
                <option value="">--Select Gender--</option>
                {genderOptions.map((gender, index) => (
                  <option key={index} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
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
              <label>Roll No: </label>
              <input
                type="number"
                name="rollNo"
                placeholder="123"
                value={formData.rollNo}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Class: </label>
              <input
                type="text"
                name="grade"
                placeholder="Matric / O-Level"
                value={formData.grade}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Section: </label>
              <input
                type="text"
                name="section"
                placeholder="A"
                value={formData.section}
                onChange={handleChange}
                className={formInputStyle}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 my-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
          >
            {initialData ? "Update" : "Save"}{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
