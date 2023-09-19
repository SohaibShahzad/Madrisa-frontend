"use client";

import axios from "axios";
import { useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/layouts/MainLayout";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState({
    message: "",
    icon: null,
    styling: "",
  });

  const inputStyle =
    "bg-transparent border-2 rounded-md px-3 py-2 border-[#aaaaaa] focus:border-[#333333] focus:outline-none";

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/student/login`,
        formData
      );
      if (res.status === 200) {
        clearForm();
        setCookie(null, "token", res.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="flex flex-col gap-2 sm:gap-5 items-center">
        <div className="leading-tight text-center">
          <span className="text-[22px] font-bold sm:flex sm:gap-2 sm:text-[24px]">
            <h1>Learning</h1>
            <h1>Management System</h1>
          </span>
          <span className="opacity-60">Please enter your credentials</span>
        </div>
        <div className="mx-3 rounded-md px-3 py-4 sm:w-[400px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputStyle}
            />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputStyle}
            />
            <div className="flex items-center justify-end gap-1">
              <input
                type="checkbox"
                id="showPass"
                onChange={() => setShowPass((prev) => !prev)}
                className="cursor-pointer rounded-md h-4 w-4"
              />
              <label
                htmlFor="showPass"
                className="text-[12px] cursor-pointer select-none"
              >
                Show Password
              </label>
            </div>
            <button
              onClick={handleSubmit}
              className="button-animation hover:text-black font-bold py-2 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
  );
}
