"use client";

import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("name", name);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/register`,
      formData
    );
    if (res.status === 201) {
      console.log(res.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 flex-col text-black">
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
