"use client";

import { useState } from "react";
import AddSubjectForm from "@/components/forms/addSubjectForm";

export default function Subjects() {
  const [addSubjectToggle, setAddSubjectToggle] = useState(false);
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
      {addSubjectToggle && <AddSubjectForm />}
    </div>
  );
}
