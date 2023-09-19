"use client";

import { useState, useEffect } from "react";
import { CgMenuLeft } from "react-icons/cg";
import {
  BiSolidChevronDown,
  BiSolidUserCircle,
  BiSolidBell,
} from "react-icons/bi";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useStateContext } from "@/contexts/contextProvider";

const NavButton = ({ title, customFunction, icon, color, dotColor }) => {
  return (
    <button
      type="button"
      onClick={customFunction}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-gray-300"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  );
};

export default function DashNavbar({ toggleSidebar, isOpen }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { activeMenu, setActiveMenu, screenSize, setScreenSize } =
    useStateContext();
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      console.log(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleLogout = () => {
    destroyCookie(null, "token");
    router.replace("/");

    console.log("logout");
  };

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mx-6 md:pr-[14rem] relative">
      <NavButton
        title="Menu"
        customFunction={() =>
          setActiveMenu((prevActiveMenu) => !prevActiveMenu)
        }
        icon={<CgMenuLeft />}
        color="#fff"
        dotColor="#fff"
      />
      <div className="flex">
        <NavButton
          title="Notifications"
          customFunction={() => console.log("notification")}
          icon={<BiSolidBell />}
          color="#fff"
          dotColor="#fff"
        />
        <NavButton
          title="Profile"
          customFunction={() => setIsDropdownOpen((prev) => !prev)}
          icon={<BiSolidUserCircle />}
          color="#fff"
          dotColor="#fff"
        />
      </div>
    </div>
  );

  // return (
  //   <nav className="relative text-white p-4 flex justify-between items-center">
  //     <button className="bg-gray-700 rounded" onClick={toggleSidebar}>
  //       {!isOpen && <CgMenuLeft className="m-2" />}
  //     </button>
  //     <div className="flex gap-3 items-center">
  //       <div className=" cursor-pointer transition-all hover:scale-125">
  //         <BiSolidBell className="w-6 h-6" />
  //       </div>
  //       <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
  //         <span className="bg-[#008599] rounded-full px-2 py-[5px] flex gap-[2px]  items-center transition-all hover:scale-110">
  //           <BiSolidUserCircle className="w-6 h-6" />
  //           <BiSolidChevronDown className="w-5 h-5" />
  //         </span>
  //       </button>
  //       {isDropdownOpen && (
  //         <div className="navbar-sm-animation absolute right-3 top-[100%] bg-[#2D3748] rounded-md shadow-md p-2">
  //           <span>
  //             <button
  //               className="w-full text-left px-2 py-1 rounded-md hover:bg-[#4A5568]"
  //               onClick={handleLogout}
  //             >
  //               Settings
  //             </button>
  //             <button
  //               className="w-full text-left px-2 py-1 rounded-md hover:bg-[#4A5568]"
  //               onClick={handleLogout}
  //             >
  //               Logout
  //             </button>
  //           </span>
  //         </div>
  //       )}
  //     </div>
  //   </nav>
  // );
}
