"use client";

import { useState } from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Calendar from "@/components/calendar";

export default function student_attendance() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  }

  return (
    <div className="mt-1">
       <span className="flex justify-between items-start">
        <h1 className="text-2xl">Attendance Management</h1>
      </span>
      <p className="opacity-50">Please select the date to proceed</p>
      <div className="my-2"/>
      <Tabs selectedIndex={activeTab} onSelect={handleTabChange}>
        <TabList className="flex gap-3 justify-center mb-3 cursor-pointer">
          <Tab className="border-2 rounded-md p-2" selectedClassName="bg-orange-500 ">Student</Tab>
          <Tab className="border-2 rounded-md p-2" selectedClassName="bg-blue-500 ">Teacher</Tab>
        </TabList>
        <TabPanel>
          <div>Student</div>
          <Calendar member="Student"/>
        </TabPanel>
        <TabPanel>
          <div>Teacher</div>
          <Calendar member="Teacher"/>
        </TabPanel>
      </Tabs>
    </div>
  );
}
