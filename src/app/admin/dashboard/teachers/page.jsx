"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import AddTeacherForm from "@/components/forms/addTeacherForm";
import DataGrid from "@/components/tables/dataGrid";
import ProfileCard from "@/components/cards/profileCard";

export default function Teachers() {
  const [teachers, setTeachers] = useState(null);
  const [addTeacherToggle, setAddTeacherToggle] = useState(false);
  const headers = [
    "Name",
    "Email",
    "Phone",
    // "Address",
    // "DOB",
    "Education",
    // "Actions",
  ];

  function renderRow(teacher) {
    return [
      `${teacher.firstName} ${teacher.lastName}`,
      teacher.email,
      teacher.phone,
      // teacher.address,
      // teacher.dob,
      `${teacher.education.university} - ${teacher.education.degree} - ${teacher.education.year}`,
    ];
  }

  function handleEdit(teacher) {
    console.log("Edit Teacher", teacher);
  }

  function handleDelete(teacher) {
    console.log("Delete Teacher", teacher);
  }

  function handleViewProfile(teacher) {
    console.log("View Profile", teacher);
  }

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

  return (
    <div className="mt-1">
      <span className="flex justify-between items-start">
        <h1 className="text-2xl">Teachers</h1>
        <button
          onClick={() => setAddTeacherToggle((prev) => !prev)}
          className={`text-white text-[12px] py-2 px-3 rounded transition duration-300 ${
            addTeacherToggle
              ? "bg-red-500 hover:bg-red-700"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {addTeacherToggle ? "Cancel" : "Add Teacher"}
        </button>
      </span>
      {addTeacherToggle ? (
        <AddTeacherForm />
      ) : (
        <div>
          {/* {teachers && (
            <DataGrid
              data={teachers}
              headers={headers}
              renderRow={renderRow}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )} */}
          {teachers && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teachers.map((teacher) => (
                <ProfileCard
                  key={teacher._id}
                  teacher={teacher}
                  onEdit={handleEdit} // define this function to handle edit action
                  onDelete={handleDelete} // define this function to handle delete action
                  onViewProfile={handleViewProfile} // define this function to handle view profile action
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
