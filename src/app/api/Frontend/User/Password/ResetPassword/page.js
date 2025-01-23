"use client";
import React, { useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = localStorage.getItem("AccessToken");
      console.log("AccessToken from localStorage:", accessToken);

      if (!accessToken) {
        toast.error("You must be logged in to update your password.");
        return;
      }

      const response = await axios.post(
        "/api/Backend/Password/ResetPassword",
        { password },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully");
        router.push("/api/Frontend/User/Userlogin");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data.message === "Invalid or expired token") {
          toast.error("Your session has expired. Please log in again.");
        } else {
          toast.error(err.response.data.message);
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-5">
      {/* Background Image */}
      <Image 
        src="/split.jpeg" 
        alt="Split bills" 
        fill 
        className="object-cover" 
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center px-5 md:px-32">
        <div className="w-full max-w-lg bg-white/70 shadow-lg rounded-xl p-20 backdrop-blur-md">
          <img className="w-24 mb-6 mx-auto" src="/logo.jpeg" alt="Logo" />
          <form onSubmit={handleSubmit}>
            <h3 className="text-xl font-medium mb-4">Enter New Password</h3>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="New Password"
            />
            <button
              type="submit"
              className="bg-black text-white font-semibold rounded-lg px-5 py-3 w-full text-xl"
            >
              Update Password
            </button>
          </form>


          <p className="text-center mt-6 text-lg">
            Remembered your password?{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;