"use client";

import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register/", form);
      alert(res.data.message);
    } catch (err) {
      alert("Error: " + err.response?.data?.email || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleRegister} className="p-8 shadow-lg rounded-xl bg-white space-y-4">
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="border p-2 w-full" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-2 w-full" type="email" required />
        <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" className="border p-2 w-full" required />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" className="border p-2 w-full" type="password" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}
