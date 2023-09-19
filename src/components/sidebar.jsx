"use client";

import { useState, useEffect } from "react";
import { useStateContext } from "@/contexts/contextProvider";
import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { adminLinks } from "@/data/adminLinks";
import ActiveLink from "./activeLink";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSidebar = () => {
    if (activeIndex && screenSize <= 900) {
      setActiveIndex(false);
    }
  };

  return (
    <div
      className="fixed glassmorphism text-white font-poppins md:overflow-y-auto overflow-x-hidden overflow-auto md:hover:overflow-x-hidden pb-10 rounded-lg"
      style={{ height: "calc(100vh - 20px)" }}
    >
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <span className="text-[26px]">LMS</span>
            <button
              type="button"
              onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10">
            {adminLinks.map((link, index) => (
              <div key={index}>
                <p className="text-gray-400 text-[14px] m-3 uppercase">{link.title}</p>
                {link.links.map((subLink, subIndex) => (
                  <ActiveLink
                  key={subIndex}
                  href={subLink.href}
                  styles="flex items-center gap-2 px-3 py-2 rounded-lg text-lg text-white text-gray-700 hover:bg-blue-500 m-2"
                  onClick={handleCloseSidebar}
                >
                    {subLink.icon}
                    <span className="capitalize text-[14px] ">{subLink.label}</span>
                  </ActiveLink>
                ))}
                </div>
            ))}
          </div>
        </>
      )}
    </div>
  );

}
