"use client";

import { useState } from "react";
import { useAuth } from "../../context/authContext";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="flex justify-center dark:bg-white items-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="p-6 rounded-xl shadow-md w-80 bg-white dark:bg-gray-800"
            >
                <h2 className="text-xl mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border mb-3 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border mb-3 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full cursor-pointer bg-blue-500 text-white p-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}
