"use client";
import Link from "next/link";
import React from "react";
import { firebase_app } from "@/config/firebase";
import { signOut, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

function Header() {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-3xl font-semibold">
          Resume Builder
        </Link>
        <nav className=" flex items-center gap-5">
          <ul className="flex space-x-6">
            <li className="text-lg">Home</li>
            <li className="text-lg">Features</li>
            <li className="text-lg">Pricing</li>
            <Link href={'/resume-list'} className="text-lg">My Resume</Link>
          </ul>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-red-500"
          >
            Sign Out
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
