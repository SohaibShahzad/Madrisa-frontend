"use client";

import axios from "axios";
import { useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
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
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/login`,
        formData
      );
      if (res.status === 200) {
        clearForm();
        setCookie(null, "token", res.data.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="leading-tight">
        <h1 className="text-center text-[26px] font-bold">Welcome Admin</h1>
        <span className="opacity-60">Please enter your credentials</span>
      </div>
      <div className="mx-3 glassmorphism rounded-md px-3 py-4 sm:w-[400px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="name"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
