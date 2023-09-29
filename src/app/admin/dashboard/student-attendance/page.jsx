"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Calendar from "@/components/calendar";

export default function student_attendance() {
  const [students, setStudents] = useState(null);
  const router = useRouter();

  return (
    <div className="mt-1">
       <span className="flex justify-between items-start">
        <h1 className="text-2xl">Students' Attendance</h1>
      </span>
      <p className="opacity-50">Please select the date to proceed</p>
      <div className="my-2"/>
      <Calendar/>
    </div>
  );
}
