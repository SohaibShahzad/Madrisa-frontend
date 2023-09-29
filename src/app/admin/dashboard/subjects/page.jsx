"use client";

import { useEffect, useState } from "react";
import AddSubjectForm from "@/components/forms/addSubjectForm";
import DataGrid from "@/components/tables/dataGrid";
import axios from "axios";

export default function Subjects() {
  const [subjects, setSubjects] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [students, setStudents] = useState(null);
  const [addSubjectToggle, setAddSubjectToggle] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const headers = ["Code", "Name"];

  async function fetchSubjects() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/subject/getAll`
      );
      setSubjects(res.data.subjects);
    } catch (error) {
      console.log("failure", error);
    }
  }

  async function fetchStudents  () {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/student/getAll`
      );
      setStudents(res.data.students);
    } catch (error) {
      console.log("failure", error);
    }
  }

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

  async function refreshSubjects() {
    setAddSubjectToggle(false);
    setEditingSubject(null);
    await fetchSubjects();
  }

  function renderRow(subject) {
    return [subject.code, subject.name];
  }

  function handleDelete(subject) {
    try {
      axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/subject/delete/${subject._id}`
      );
      refreshSubjects();
    } catch (error) {
      console.log("Unable to delete Subject", error);
    }
  }

  function handleEdit(subject) {
    setEditingSubject(subject);
    setAddSubjectToggle(true);
  }

  useEffect(() => {
    fetchSubjects();
    fetchTeachers();
    fetchStudents();
  }
  , []);

  return (
    <div className="mt-1">
      <span className="flex justify-between items-start">
        <h1 className="text-2xl">Subjects</h1>
        <button
          onClick={() => setAddSubjectToggle((prev) => !prev)}
          className={`text-white text-[12px] py-2 px-3 rounded transition duration-300 ${
            addSubjectToggle
              ? "bg-red-500 hover:bg-red-700"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {addSubjectToggle ? "Cancel" : "Add Subject"}
        </button>
      </span>
      {addSubjectToggle ? (
        <AddSubjectForm onSubjectsAdded={refreshSubjects} initialData={editingSubject} teachers={teachers} students={students}/>
      ) : (
        <div>
          {subjects && (
            <DataGrid
              data={subjects}
              headers={headers}
              renderRow={renderRow}
              onDelete={handleDelete}
              onEdit={handleEdit}
              showEditButton={true}
            />
          )}
        </div>
      )}
    </div>
  );
}
