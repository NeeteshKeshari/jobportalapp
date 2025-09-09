"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null); // user info
  const [loading, setLoading] = useState(true);

  // Load user from localStorage (if already logged in)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // you could also decode token here if needed
      setUser({ token });
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login successful, token:", data.token);
        localStorage.setItem("token", data.token);
        setUser({ token: data.token });
        router.push("/"); // redirect after login
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registration successful, please login.");
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Register failed:", err);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
