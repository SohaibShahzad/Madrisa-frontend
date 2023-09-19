"use client";

import axios from "axios";
import { useState, useEffect } from "react";

async function addSubjectRequest(data, resetForm) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/subject/create`,
      data
    );
    resetForm();
    console.log("success", res);
  } catch (error) {
    console.log("failure", error);
  }
}

export default function AddSubjectForm() {
  const [teachers, setTeachers] = useState(null);
  const formInputStyle =
    "bg-transparent border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent";
  const [formData, setFormData] = useState({
    name: "",
    teachers: [{ teacherId: "", section: "" }],
  });

  useEffect(() => {
    async function getAllTeachers() {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/teacher/getAll`
        );
        setTeachers(res.data.teachers);
      } catch (error) {
        console.log("failure", error);
      }
    }

    getAllTeachers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddClick = () => {
    setFormData({
      ...formData,
      teachers: [...formData.teachers, { teacherId: "", section: "" }],
    });
  };

  const handleRemoveClick = (index) => {
    const list = [...formData.teachers];
    list.splice(index, 1);
    setFormData({ ...formData, teachers: list });
  };

  const resetForm = () => {
    setFormData({ name: "", teachers: [{ teacherId: "", section: "" }] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSubjectRequest(formData, resetForm);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <input
        className={formInputStyle}
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      {formData.teachers.map((teacher, index) => (
        <div key={index} className="flex gap-2">
          <select
            className={formInputStyle}
            name="teacherId"
            value={teacher.teacherId}
            onChange={(e) => handleChange(e, index)}
            required
          >
            <option value="" disabled>
              Select Teacher
            </option>
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.firstName} {t.lastName}
              </option>
            ))}
          </select>
          <input
            className={formInputStyle}
            type="text"
            name="section"
            placeholder="Section"
            value={teacher.section}
            onChange={(e) => handleChange(e, index)}
            required
          />
          {formData.teachers.length - 1 === index && (
            <button type="button" onClick={handleAddClick}>
              Add
            </button>
          )}
          {formData.teachers.length !== 1 && (
            <button type="button" onClick={() => handleRemoveClick(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
        type="submit"
      >
        Add Subject
      </button>
    </form>
  );
}
