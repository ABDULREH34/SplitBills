"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyUser = () => {
  const [verifyCode, setVerifyCode] = useState(""); 
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const accessToken = localStorage.getItem("AccessToken");
      console.log("AccessToken from localStorage:", accessToken);

      if (!accessToken) {
        toast.error("You must be logged in to verify your account.");
        return;
      }

      const response = await axios.post(
        "/api/Backend/controller/DriverVerify",
        { verifyCode }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("User verified successfully!");
        router.push("/api/Frontend/DriverDetailsAll/Driverlogin");
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
            <h3 className="text-xl font-medium mb-4">Enter Verification Code</h3>
            <input
              required
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              className="bg-gray-200 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="Verification Code"
            />
            <button
              type="submit"
              className="bg-black text-white font-semibold rounded-lg px-5 py-3 w-full text-xl"
            >
              Verify Account
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default VerifyUser;