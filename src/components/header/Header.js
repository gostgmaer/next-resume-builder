"use client";
import Link from "next/link";
import React from "react";

import { useAuthContext } from "@/context/authContext";

function Header() {
  const { Logout, user, userId } = useAuthContext();

  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white py-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-3xl font-semibold">
          Resume Builder
        </Link>
        {userId ? (
          <nav className=" flex items-center gap-5">
            <Link
              href="/resume-builder"
              className="text-white hover:text-gray-200"
            >
              Builder
            </Link>
            <Link
              href="/resume-list"
              className="text-white hover:text-gray-200"
            >
              My Resumes
            </Link>
            <Link href="/profile" className="text-white hover:text-gray-200">
              My Profile
            </Link>
            {userId && (
              <button
                onClick={Logout}
                className="bg-red-500 hover:bg-red-400 text-white hover:text-gray-800 rounded-full py-2 px-6 transition duration-300"
              >
                Sign Out
              </button>
            )}
          </nav>
        ) : (
          <nav className=" flex items-center gap-5">
            <Link
              href={"/auth/login"}
              className="text-white hover:text-gray-200"
            >
              Sign In
            </Link>

            <Link
              href={"/auth/register"}
              className="bg-white text-blue-500 hover:bg-blue-400 hover:text-gray-800 rounded-full py-2 px-6 transition duration-300"
            >
              Sign Up
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
