"use client";

import axios from "axios";
import { useState, useRef, useEffect } from "react";

async function addOrUpdateTeacherRequest(data, isEditMode, onSuccess) {
  const url = isEditMode
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}/teacher/update/${data._id}`
    : `${process.env.NEXT_PUBLIC_SERVER_URL}/teacher/register`;
  try {
    const res = await axios.post(url, data);
    onSuccess();
    console.log("success", res);
  } catch (error) {
    console.log("failure", error);
  }
}

export default function AddTeacherForm({ onTeachersAdded, initialData }) {
  const formInputStyle =
    "bg-transparent border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent";
  const fileInput = useRef();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const [isAddingSalary, setIsAddingSalary] = useState(false);
  const [newSalary, setNewSalary] = useState({ amount: "", month: "" });

  const [imageFile, setImageFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [continueWithoutSubject, setContinueWithoutSubject] = useState(false);
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    salary: [
      {
        amount: "",
        month: "",
      },
    ],
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

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      // setImagePreviewUrl(initialData.image);
      setSelectedSubjects(initialData.subjects.map((sub) => sub.id));
    }
    async function fetchSubjects() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/subject/getAll`
        );
        setSubjects(res.data.subjects);
      } catch (error) {
        console.log("failure in subjects fetching", error);
      }
    }
    fetchSubjects();
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

  const handleCheckboxChange = (subjectId, isChecked) => {
    if (isChecked) {
      setSelectedSubjects((prevSubjects) => [...prevSubjects, subjectId]);
    } else {
      setSelectedSubjects((prevSubjects) =>
        prevSubjects.filter((id) => id !== subjectId)
      );
    }
  };

  const handleContinueWithoutSubjectChange = (isChecked) => {
    setContinueWithoutSubject(isChecked);
    if (isChecked) {
      setSelectedSubjects([]); // Clear all selected subjects
    }
  };

  const addSalaryToList = () => {
    setFormData({
      ...formData,
      salary: [...formData.salary, newSalary],
    });
    setNewSalary({ amount: "", month: "", datePaid: "" });
    setIsAddingSalary(false);
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
      formData.dob === "" ||
      formData.education.university === "" ||
      formData.education.degree === "" ||
      formData.education.year === ""
    ) {
      return;
    }
    const dataWithSubjects = {
      ...formData,
      subjects: selectedSubjects,
    };
    const isEditMode = !!initialData;
    addOrUpdateTeacherRequest(dataWithSubjects, isEditMode, () => {
      resetForm();
      if (onTeachersAdded) onTeachersAdded();
    });
  };

  return (
    <div className="mb-[10px]">
      <form onSubmit={handleSubmit}>
        <div className="glassmorphism rounded-lg p-5 mt-5">
          <h2 className="text-[18px] font-bold tracking-[1px]">
            Personal Details
          </h2>
          <div className="border-[1px]  opacity-50 rounded-full my-5" />
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
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
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
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
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
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
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
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
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
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
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
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
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
              <label>Address: </label>
              <textarea
                name="address"
                placeholder="Street, City, Country"
                value={formData.address}
                onChange={handleChange}
                className={`${formInputStyle} h-32`}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
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
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
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
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
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
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
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

        <div className="h-8" />
        <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
          {subjects.map((subject) => (
            <div key={subject._id} className="mb-2">
              <input
                type="checkbox"
                id={subject._id}
                value={subject._id}
                disabled={continueWithoutSubject}
                checked={selectedSubjects.includes(subject._id)}
                onChange={(e) =>
                  handleCheckboxChange(subject._id, e.target.checked)
                }
              />
              <label htmlFor={subject._id} className="ml-2">
                {subject.name}
              </label>
            </div>
          ))}

          <div>
            <input
              type="checkbox"
              id="continueWithoutSubject"
              checked={continueWithoutSubject}
              onChange={(e) =>
                handleContinueWithoutSubjectChange(e.target.checked)
              }
            />
            <label htmlFor="continueWithoutSubject" className="ml-2">
              Continue without subject
            </label>
          </div>
        </div>
        <div>
          {formData.salary.map((salary, index) => (
            <div key={index} className="mb-2">
              <span>Amount: {salary.amount}</span>,{" "}
              <span>Month: {salary.month}</span>,{" "}
            </div>
          ))}
          {!isAddingSalary && (
            <button
              type="button"
              onClick={() => setIsAddingSalary(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300"
            >
              Add Salary
            </button>
          )}
          {isAddingSalary && (
            <div className="w-full md:w-1/2 px-2 mb-4 space-y-1">
              <label>Amount: </label>
              <input
                type="text"
                value={newSalary.amount}
                onChange={(e) =>
                  setNewSalary({ ...newSalary, amount: e.target.value })
                }
                className={formInputStyle}
              />
              <label>Month: </label>
              <input
                type="text"
                value={newSalary.month}
                onChange={(e) =>
                  setNewSalary({ ...newSalary, month: e.target.value })
                }
                className={formInputStyle}
              />

              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  onClick={addSalaryToList}
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300"
                >
                  Add to List
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingSalary(false)}
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300"
                >
                  Remove
                </button>
              </div>
            </div>
          )}
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
