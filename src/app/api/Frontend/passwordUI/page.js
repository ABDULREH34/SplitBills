"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    setMessage("");
    setError("");

    
    try {
      const response = await axios.post("/api/Backend/Password/ResetPassword", { password }, {
        withCredentials: true, 
      });

      if (response.status === 200) {
        setMessage("Password updated successfully");
        
        router.push("/login");
      }
    } catch (err) {
      if (err.response) {
        
        setError(err.response.data.message);
      } else {
        
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-full max-w-lg bg-white p-10 shadow-md rounded-lg">
        <h2 className="text-xl font-medium mb-6">Update Your Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300"
              placeholder="New Password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg"
          >
            Update Password
          </button>
        </form>

        {message && <div className="mt-4 text-green-500">{message}</div>}
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default UpdatePassword;
