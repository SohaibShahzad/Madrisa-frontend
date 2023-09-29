"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import AttendanceTableHeading from "@/components/tables/attendanceTableHeading";
import axios from "axios";
import Link from "next/link";

export default function AttendanceByDate() {
  const { date } = useParams();
  const [students, setStudents] = useState([]);
  const [selectedAttendanceStatus, setSelectedAttendanceStatus] =
    useState(null);

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
  function handleAttendanceChange(studentId, setTo) {
    console.log("studentId", studentId);
    // Use the `date` from params instead of the current date
    const selectedDate = new Date(date).setHours(0, 0, 0, 0);

    setStudents((prev) => {
      const updatedStudents = prev.map((student) =>
        student._id === studentId
          ? {
              ...student,
              attendance: student.attendance?.length
                ? [
                    ...student.attendance.filter(
                      (a) =>
                        new Date(a.date).toDateString() !==
                        new Date(selectedDate).toDateString()
                    ),
                    {
                      date: selectedDate,
                      status: setTo,
                    },
                  ]
                : [{ date: selectedDate, status: setTo }],
            }
          : student
      );

      // Check whether all students have the same attendance status
      const allSameStatus = updatedStudents.every((student) => {
        const attendanceForDate = student.attendance?.find(
          (a) => new Date(a.date).setHours(0, 0, 0, 0) === selectedDate
        ) || { status: null };
        return attendanceForDate.status === setTo;
      });

      // If not all students have the same status, set selectedAttendanceStatus to null
      if (!allSameStatus) {
        setSelectedAttendanceStatus(null);
      }

      return updatedStudents;
    });
  }

  async function handleSaveAttendance() {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/student/bulkAttendance`,
        students
      );
    } catch (error) {
      console.log("Unable to save attendance", error);
    }
  }

  useEffect(() => {
    if (selectedAttendanceStatus) {
      const selectedDate = new Date(date).setHours(0, 0, 0, 0);
      setStudents((prevStudents) =>
        prevStudents.map((student) => ({
          ...student,
          attendance: [
            ...student.attendance.filter(
              (a) =>
                new Date(a.date).toDateString() !==
                new Date(selectedDate).toDateString()
            ),
            {
              date: selectedDate,
              status: selectedAttendanceStatus,
            },
          ],
        }))
      );
    }
  }, [selectedAttendanceStatus]);

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex h-[calc(100vh-4.6rem)] w-full flex-col overflow-hidden ">
      <h1 className="flex h-20 items-center px-2 text-3xl font-bold capitalize">
        Update Attendance for {date}
      </h1>
      <div className="h-full max-w-7xl flex-grow overflow-y-auto px-3 md:px-5 ">
        <TableContainer className="h-[50rem]">
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  className="bg-transparent text-white font-poppins"
                  align="center"
                  colSpan={2}
                >
                  Details
                </TableCell>
                <TableCell
                  className="bg-transparent text-white font-poppins"
                  align="center"
                  colSpan={3}
                >
                  Fill Attendance
                </TableCell>
              </TableRow>
              <AttendanceTableHeading
                selectedRadio={selectedAttendanceStatus}
                onChange={(e) => setSelectedAttendanceStatus(e.target.value)}
              />
            </TableHead>
            <TableBody>
              {students.map((student, i) => {
                const attendanceForDate = student.attendance?.find((a) => {
                  return (
                    new Date(a.date).setHours(0, 0, 0, 0) ===
                    new Date(date).setHours(0, 0, 0, 0)
                  );
                }) || { status: null };
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={student.id}
                  >
                    <TableCell className="text-white font-poppins">
                      {student.rollNo}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-white font-poppins">
                        <div>{/* Avatar rendering logic here */}</div>
                        <div>
                          {student.firstName} {student.lastName}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Avatar
                        tabIndex={0}
                        className={`bg-[#394660] cursor-pointer ${
                          attendanceForDate.status === "p"
                            ? "ring-2 ring-green-500"
                            : ""
                        }`}
                        onClick={() => handleAttendanceChange(student._id, "p")}
                      >
                        P
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Avatar
                        tabIndex={0}
                        className={`bg-[#394660] cursor-pointer ${
                          attendanceForDate.status === "a"
                            ? "ring-2 ring-red-500"
                            : ""
                        }`}
                        onClick={() => handleAttendanceChange(student._id, "a")}
                      >
                        A
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Avatar
                        tabIndex={0}
                        className={`bg-[#394660] cursor-pointer ${
                          attendanceForDate.status === "l"
                            ? "ring-2 ring-yellow-500"
                            : ""
                        }`}
                        onClick={() => handleAttendanceChange(student._id, "l")}
                      >
                        L
                      </Avatar>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAttendance}
        >
          Save Attendance
        </Button>
      </div>
    </div>
  );
}
