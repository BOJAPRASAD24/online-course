"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, registerUser } from "./services/api"; 

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await login(email, password);
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        router.push("/dashboard");
      } else {
        await registerUser({ username, email, mobile, password });
        alert("Registration successful! Please login.");
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setUsername("");
        setMobile("");
      }
    } catch (err) {
      alert(`${isLogin ? "Login" : "Registration"} failed`);
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <>
            <input
              className="w-full p-2 border mb-4 rounded"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="w-full p-2 border mb-4 rounded"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </>
        )}

        <input
          className="w-full p-2 border mb-4 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 border mb-4 rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className={`w-full ${
            isLogin ? "bg-blue-600" : "bg-green-600"
          } text-white py-2 rounded hover:opacity-90`}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}


