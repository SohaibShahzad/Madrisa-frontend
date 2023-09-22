"use client";

import { useState, useEffect } from "react";
import AddSalaryForm from "@/components/forms/addSalaryForm";
import axios from "axios";
import DataGrid from "@/components/tables/dataGrid";

export default function salaries() {
  const [addSalaryToggle, setAddSalaryToggle] = useState(false);
  const [salaries, setSalaries] = useState(null);
  const headers = ["Teacher Name", "Month", "Amount"];

  async function fetchSalaries() {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/salaries/getAll`
      );
      setSalaries(res.data.salaries);
    } catch (error) {
      console.log("failure", error);
    }
  }

  async function refreshSalaries() {
    setAddSalaryToggle(false);
    await fetchSalaries();
  }

  function renderRow(salary) {
    return [
      `${salary.teacherID.firstName} ${salary.teacherID.lastName}`,
      salary.month,
      salary.amount,
    ];
  }

  function handleEdit(salary) {
    console.log("Edit Salary", salary);
  }

  function handleDelete(salary) {
    try {
      axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/salaries/delete/${salary._id}`
      );
      refreshSalaries();
    } catch (error) {
      console.log("Unable to delete Salary", error);
    }
  }

  function handleViewProfile(salary) {
    console.log("View Profile", salary);
  }

  useEffect(() => {
    fetchSalaries();
  }, []);

  return (
    <div className="mt-1">
      <span className="flex justify-between items-start">
        <h1 className="text-2xl">Salaries</h1>
        <button
          onClick={() => setAddSalaryToggle((prev) => !prev)}
          className={`text-white text-[12px] py-2 px-3 rounded transition duration-300 ${
            addSalaryToggle
              ? "bg-red-500 hover:bg-red-700"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {addSalaryToggle ? "Cancel" : "Add Salary"}
        </button>
      </span>
      {addSalaryToggle ? (
        <AddSalaryForm onSalaryAdded={refreshSalaries} />
      ) : (
        <div>
          {salaries && (
            <DataGrid
              data={salaries}
              headers={headers}
              renderRow={renderRow}
              onDelete={handleDelete}

            />
          )}
        </div>
      )}
    </div>
  );
}
