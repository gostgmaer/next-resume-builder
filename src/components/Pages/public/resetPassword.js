"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { post } from "@/lib/http";
import { notifyerror } from "@/lib/notify/notice";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const param = useSearchParams();
  const route = useRouter();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!param.getAll("token")[0]) {
      notifyerror("No password reset token found", 2000);
    } else {
      if (password === confirmPassword) {
        try {
          const reset = await post(
            `/user/reset-password/${param.getAll("token")[0]}`,
            { password: password }
          );
          if (reset.status == "OK") {
            route.push("/auth/login");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        notifyerror("Passwords do not match", 2000);
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96 text-black">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Reset Password
          </h2>
          <form className="mt-8" onSubmit={handleSubmit}>
            {/* Password Input */}
            <div className="rounded-md shadow-sm">
              <div>
                <input
                  aria-label="Password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              {/* Confirm Password Input */}
              <div className="mt-4">
                <input
                  aria-label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
