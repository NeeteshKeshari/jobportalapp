"use client";

import { useState } from "react";
import { useAuth } from "../../context/authContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password);
  };

  return (
    <div className="flex justify-center dark:bg-white items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl shadow-md w-80 bg-white dark:bg-gray-800"
      >
        <h2 className="text-xl mb-4">Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border mb-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-500 cursor-pointer text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
