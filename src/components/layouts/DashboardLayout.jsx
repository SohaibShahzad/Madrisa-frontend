"use client";

import { useState } from "react";
import { useStateContext } from "@/contexts/contextProvider";
import Sidebar from "../sidebar";
import DashNavbar from "../dashNav";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { activeMenu } = useStateContext();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
     <div className="flex text-white min-h-screen bg-[#1A202C]">
        {activeMenu ? (
          <div
            className="w-58 fixed z-[1200] bg-[#1A202C] rounded-lg h-full m-2"
            style={{ height: "calc(100vh - 20px)" }}
          >
            <Sidebar />
          </div>
        ) : (
          <div className="hidden">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "flex flex-col w-full md:ml-[14rem]"
              : "w-full min-h-screen flex flex-col"
          }
        >
          <div className="fixed bg-[#1A202C] z-[1000] w-full">
            <DashNavbar />
          </div>
          <main className="flex-grow mx-5 md:mx-[2.5rem] mt-[3.5rem]">{children}</main>
        </div>
      </div>
  );
}
