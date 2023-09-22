"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import AddTeacherForm from "@/components/forms/addTeacherForm";
import ProfileCard from "@/components/cards/profileCard";
import TeacherProfile from "@/components/sections/teacherProfile";

export default function Teachers() {
  const [teachers, setTeachers] = useState(null);
  const [addTeacherToggle, setAddTeacherToggle] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);

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

  async function refreshTeachers() {
    setAddTeacherToggle(false);
    setEditingTeacher(null);
    await fetchTeachers();
  }

  function handleEdit(teacher) {
    setEditingTeacher(teacher);
    setAddTeacherToggle(true);
  }

  function handleDelete(teacher) {
    try {
      axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/teacher/delete/${teacher._id}`
      );
      refreshTeachers();
    } catch (error) {
      console.log("Unable to delete Teacher", error);
    }
  }

  function handleViewProfile(teacher) {
    setSelectedTeacher(teacher);
  }

  function handleCloseProfile() {
    setSelectedTeacher(null);
  }

  useEffect(() => {
    fetchTeachers();
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
        <AddTeacherForm
          initialData={editingTeacher}
          onTeachersAdded={refreshTeachers}
        />
      ) : selectedTeacher ? (
        <TeacherProfile
          teacherData={selectedTeacher}
          onClose={handleCloseProfile}
        />
      ) : (
        <div>
          {teachers && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {teachers.map((teacher) => (
                <ProfileCard
                  key={teacher._id}
                  teacher={teacher}
                  onEdit={handleEdit} // define this function to handle edit action
                  onDelete={handleDelete} // define this function to handle delete action
                  onViewProfile={() => handleViewProfile(teacher)} // define this function to handle view profile action
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
