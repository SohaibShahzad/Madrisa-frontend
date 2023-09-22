"use client";

import axios from "axios";
import { useState, useEffect } from "react";

async function addSalaryRequest(data, onSuccess) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/salaries/add`,
      data
    );
    onSuccess();
    console.log("success", res);
  } catch (error) {
    console.log("failure", error);
  }
}

export default function AddSalaryForm({ onSalaryAdded }) {
  const [teachers, setTeachers] = useState([]);
  const formInputStyle =
    "bg-transparent border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent";
  const [formData, setFormData] = useState({
    amount: "",
    month: "",
    teacherID: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      month: "",
      teacherID: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.teacherID === "" ||
      formData.amount === "" ||
      formData.month === ""
    ) {
      alert("Please fill all the fields");
    }
    addSalaryRequest(formData, () => {
      resetForm();
      if (onSalaryAdded) {
        onSalaryAdded();
      }
    });
  };

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/teacher/getAll`
        );
        setTeachers(res.data.teachers);
      } catch (error) {
        console.log("failure", error);
      }
    }
    fetchTeachers();
  }, []);

  return (
    <div className="mb-[10px]">
      <form onSubmit={handleSubmit}>
        <div className="glassmorphism rounded-lg p-5 mt-5">
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Amount:</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                className={formInputStyle}
                required
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Month:</label>
              <input
                type="text"
                name="month"
                value={formData.month}
                onChange={handleInputChange}
                className={formInputStyle}
                required
              />
            </div>
            <div className="w-1/2 px-2 mb-4 space-y-1">
              <label>Teacher: </label>
              <select
                name="teacherID"
                onChange={handleInputChange}
                className={`${formInputStyle} cursor-pointer`}
                required
              >
                <option value="">Select Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.firstName} {teacher.lastName}
                  </option>
                ))}
              </select>
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
