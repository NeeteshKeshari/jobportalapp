"use client";

import React from "react"
import Link from "next/link";
import { useAuth } from "../context/authContext";

export default function Header() {
    const { user, logout } = useAuth();

    return (
        <div className="w-full flex items-center justify-around gap-1 py-4 bg-gray-100 dark:invert border-b border-b-gray-500 text-center">
            <Link
                className="rounded-full border border-solid border-transparent transition-colors bg-foreground dark:invert text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base py-2 px-4 sm:px-5 sm:w-auto"
                href="/"
            >
                Home
            </Link>
            <Link
                className="rounded-full border border-solid border-transparent transition-colors bg-foreground dark:invert text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base py-2 px-4 sm:px-5 sm:w-auto"
                href="/jobs"
            >
                Jobs
            </Link>
            {user ? (
                <button
                    onClick={logout}
                    className="rounded-full cursor-pointer border border-solid border-transparent transition-colors bg-foreground dark:invert text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base py-2 px-4 sm:px-5 sm:w-auto"
                >
                    Logout
                </button>
            ):
                <>
                    <Link
                        className="rounded-full border border-solid border-transparent transition-colors bg-foreground dark:invert text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base py-2 px-4 sm:px-5 sm:w-auto"
                        href="/login"
                    >
                        Login
                    </Link>
                    <Link
                        className="rounded-full border border-solid border-transparent transition-colors bg-foreground dark:invert text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base py-2 px-4 sm:px-5 sm:w-auto"
                        href="/register"
                    >
                        Register
                    </Link>
                </>
            }
            <Link
                className="rounded-full border border-solid border-transparent transition-colors bg-foreground dark:invert text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base py-2 px-4 sm:px-5 sm:w-auto"
                href="/admin"
            >
                Admin
            </Link>
        </div>
    )
}