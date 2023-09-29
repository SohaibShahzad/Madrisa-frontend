"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  addMonths,
  subMonths,
  parse,
  isSameDay,
  isSameMonth,
  parseISO,
} from "date-fns";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

function Calendar({ member }) {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceDates, setAttendanceDates] = useState([]);

  useEffect(() => {
    const endpoint =
      member === "Student"
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/student/getAllAttendance`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/teacher/getAllAttendance`;

    axios
      .get(endpoint)
      .then((response) => {
        if (Array.isArray(response.data.attendance)) {
          const markedDates = response.data.attendance.flatMap((student) =>
            student.attendance.map((item) =>
              format(new Date(item.date), "yyyy-MM-dd")
            )
          );
          setAttendanceDates(markedDates);
        } else {
          console.error(
            "Expected array but received:",
            response.data.attendance
          );
        }
      })
      .catch((error) => console.error(error));
  }, [member]);

  console.log(attendanceDates);

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle items-center">
        <div
          className="cursor-pointer transition-all hover:scale-150 duration-100"
          onClick={() => prevMonth()}
        >
          <FaChevronLeft />
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div
          className="cursor-pointer transition-all hover:scale-150 duration-100"
          onClick={() => nextMonth()}
        >
          <FaChevronRight />
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEE";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "yyyy-MM-dd");
        const cloneDay = day;

        const isMarkedDate = attendanceDates.includes(formattedDate);

        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? member === "Teacher"
                  ? "selected-teacher text-white"
                  : "selected-student text-white"
                : ""
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className={`number ${isMarkedDate ? "circled-date" : ""}`}>
              {formattedDate.split("-")[2]}
            </span>
            <span className="bg">{formattedDate.split("-")[2]}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  const onDateClick = (day) => {
    setSelectedDate(day);
    const dateString = format(day, "yyyy-MM-dd");
    router.push(`/admin/dashboard/attendance-management/${dateString}?member=${member}`);
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div>
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      <div
        className="flex justify-end text-right cursor-pointer opacity-50 transition-all hover:opacity-100 duration-100 my-2"
        onClick={() => goToToday()}
      >
        <span className="border-2 flex items-center rounded-md mt-5 px-4 py-2 mb-2">
          Go to Today's Date <FaChevronRight />
        </span>
      </div>
    </div>
  );
}

export default Calendar;
