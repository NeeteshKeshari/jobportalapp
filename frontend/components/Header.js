import React from "react"
import Link from "next/link";

export default function Header() {

    return (
        <div className="w-full flex items-center justify-around gap-1 py-4 bg-gray-100 border-b border-b-gray-500 text-center">
            <Link
                className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base py-2 px-4 sm:px-5 sm:w-auto"
                href="/"
            >
                Home
            </Link>
            <Link
                className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base py-2 px-4 sm:px-5 sm:w-auto"
                href="/jobs"
            >
                Jobs
            </Link>
            <Link
                className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base py-2 px-4 sm:px-5 sm:w-auto"
                href="/login"
            >
                Login
            </Link>
            <Link
                className="rounded-full border border-solid border-transparent transition-colors bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base py-2 px-4 sm:px-5 sm:w-auto"
                href="/admin"
            >
                Admin
            </Link>
        </div>
    )
}