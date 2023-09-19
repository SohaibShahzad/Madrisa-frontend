"use client";

import Link from "next/link";
import { FaCircleUser, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import * as jwt from "jsonwebtoken";
const jwtDecode = jwt.decode;

export default function NavBar() {
  const [mobileMenuToggle, setMobileMenuToggle] = useState(false);
  const [userRole, setUserRole] = useState({
    role: "",
    href: "",
  });

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;
    if (!token) return;
    const decodedToken = jwtDecode(token);
    const url =
      decodedToken.role === "student" ? "/" : `/${decodedToken.role}/`;
    setUserRole({
      role: decodedToken.role,
      href: url,
    });
  }, []);

  const handleLogout = () => {
    destroyCookie(null, "token");
    setMobileMenuToggle(false);
    setUserRole({
      role: "",
      href: "",
    });
  };

  return (
    <nav className="bg-[#444444] text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="sm:text-[24px] font-bold">LMS</h1>
        {userRole.role && (
          <>
            <div
              className="sm:hidden flex gap-2 items-center bg-[#eeeeee] px-2 py-1 rounded-full"
              onClick={() => setMobileMenuToggle((prev) => !prev)}
            >
              <FaCircleUser className="w-6 h-6 text-[#444444]" />
              {mobileMenuToggle ? <FaChevronUp className="text-[#444444]"/> : <FaChevronDown className="text-[#444444]"/>}
            </div>
            <div className="hidden sm:flex items-center gap-5 text-[18px]">
              <Link className="duration-100 hover:scale-110" href={`${userRole.href}dashboard`}>
                Dashboard
              </Link>
              <button
                className="bg-red-500 px-3 py-1 rounded-md button-animation-bgWhite hover:text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
      {mobileMenuToggle && (
        <div className="sm:hidden absolute right-3 top-16 bg-[#444444] rounded-[5px] navbar-sm-animation px-2 py-3">
          <div className="flex flex-col gap-3 items-center">
            <Link className="" href={`${userRole.href}dashboard`}>
              Dashboard
            </Link>
            <button
              className="bg-[#eeeeee] text-[#444444] px-2 py-1 rounded-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
