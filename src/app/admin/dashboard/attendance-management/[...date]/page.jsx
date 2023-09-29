"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AttendanceTableHeading from "@/components/tables/attendanceTableHeading";
import axios from "axios";

export default function AttendanceByDate() {
  const { date } = useParams();
  const query = useSearchParams();
  const queryData = query.get("member");
  const [personnel, setPersonnel] = useState([]);
  const [selectedAttendanceStatus, setSelectedAttendanceStatus] =
    useState(null);

  async function fetchPersonnel() {
    const endpoint =
      queryData === "Student"
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/student/getAll`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/teacher/getAll`;

    try {
      const res = await axios.get(endpoint);
      const personnelData = res.data.students || res.data.teachers;
      setPersonnel(personnelData);
    } catch (error) {
      console.log("failure", error);
    }
  }
  function handleAttendanceChange(personnelId, setTo) {
    // Use the `date` from params instead of the current date
    const selectedDate = new Date(date).setHours(0, 0, 0, 0);

    setPersonnel((prev) => {
      const updatedPersonnel = prev.map((personnel) =>
        personnel._id === personnelId
          ? {
              ...personnel,
              attendance: personnel.attendance?.length
                ? [
                    ...personnel.attendance.filter(
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
          : personnel
      );

      // Check whether all personnels have the same attendance status
      const allSameStatus = updatedPersonnel.every((personnel) => {
        const attendanceForDate = personnel.attendance?.find(
          (a) => new Date(a.date).setHours(0, 0, 0, 0) === selectedDate
        ) || { status: null };
        return attendanceForDate.status === setTo;
      });

      // If not all personnel have the same status, set selectedAttendanceStatus to null
      if (!allSameStatus) {
        setSelectedAttendanceStatus(null);
      }

      return updatedPersonnel;
    });
  }

  async function handleSaveAttendance() {
    const endpoint =
      queryData === "Student"
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/student/bulkAttendance`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/teacher/bulkAttendance`;
    try {
      await axios.post(endpoint, personnel);
    } catch (error) {
      console.log("Unable to save attendance", error);
    }
  }

  useEffect(() => {
    if (selectedAttendanceStatus) {
      const selectedDate = new Date(date).setHours(0, 0, 0, 0);
      setPersonnel((prevPersonnel) =>
        prevPersonnel.map((personnel) => ({
          ...personnel,
          attendance: [
            ...personnel.attendance.filter(
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
    fetchPersonnel();
  }, []);

  return (
    <div className="flex h-[calc(100vh-4.6rem)] mt-1 w-full flex-col overflow-hidden ">
      <span className="flex justify-between items-start">
        <h1 className="text-2xl">Attendance for {date}</h1>
      </span>
      <div className="h-full flex-grow overflow-y-auto px-3 md:px-5 ">
        <TableContainer>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    fontFamily: "Poppins",
                  }}
                  align="center"
                  colSpan={2}
                >
                  Details
                </TableCell>
                <TableCell
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    fontFamily: "Poppins",
                  }}
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
              {personnel.map((personnel, i) => {
                const attendanceForDate = personnel.attendance?.find((a) => {
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
                    key={personnel.id}
                  >
                    <TableCell
                      style={{
                        backgroundColor: "transparent",
                        color: "white",
                        fontFamily: "Poppins",
                      }}
                    >
                      {i + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-white font-poppins">
                        <div>{/* Avatar rendering logic here */}</div>
                        <div>
                          {personnel.firstName} {personnel.lastName}
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
                        onClick={() => handleAttendanceChange(personnel._id, "p")}
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
                        onClick={() => handleAttendanceChange(personnel._id, "a")}
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
                        onClick={() => handleAttendanceChange(personnel._id, "l")}
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-5"
          onClick={handleSaveAttendance}
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}
