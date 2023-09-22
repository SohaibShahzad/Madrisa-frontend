"use client";

import AddStudentForm from "@/components/forms/addStudentForm";
import { useState, useEffect } from "react";
import DataGrid from "@/components/tables/dataGrid";
import StudentProfile from "@/components/sections/studentProfile";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState(null);
  const [addStudentToggle, setAddStudentToggle] = useState(false);
  const [viewStudentData, setViewStudentData] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const headers = ["Roll No.", "Name", "Class-Section"];

  async function fetchStudents() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/student/getAll`
      );
      setStudents(res.data.students);
    } catch (error) {
      console.log("failure", error);
    }
  }

  async function refreshStudents() {
    setAddStudentToggle(false);
    setEditingStudent(null);
    await fetchStudents();
  }

  function renderRow(student) {
    return [
      student.rollNo,
      `${student.firstName} ${student.lastName}`,
      `${student.grade}-${student.section}`,
    ];
  }

  function handleEdit(student) {
    setEditingStudent(student);
    setAddStudentToggle(true);
    
  }

  function handleDelete(student) {
    try {
      axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/student/delete/${student._id}`
      );
      refreshStudents();
    } catch (error) {
      console.log("Unable to delete Student", error);
    }
  }

  function handleView(student) {
    setViewStudentData(student);
  }

  function handleClose() {
    setViewStudentData(null);
  }
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="mt-1">
      <span className="flex justify-between items-start">
        <h1 className="text-2xl">Students</h1>
        <button
          onClick={() => setAddStudentToggle((prev) => !prev)}
          className={`text-white text-[12px] py-2 px-3 rounded transition duration-300 ${
            addStudentToggle
              ? "bg-red-500 hover:bg-red-700"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {addStudentToggle ? "Cancel" : "Add Student"}
        </button>
      </span>
      {viewStudentData ? (
        <StudentProfile studentData={viewStudentData} onClose={handleClose} />
      ) : addStudentToggle ? (
        <AddStudentForm onStudentsAdded={refreshStudents} initialData={editingStudent} />
      ) : (
        <div>
          {students && (
            <DataGrid
              data={students}
              headers={headers}
              renderRow={renderRow}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onView={handleView}
              showViewButton = {true}
              showEditButton={true}
            />
          )}
        </div>
      )}
    </div>
  );
}
