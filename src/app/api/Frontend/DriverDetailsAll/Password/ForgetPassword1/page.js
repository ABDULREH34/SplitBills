"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/Backend/DriverPassword/ForgetPassword", { email });
      console.log("Email Response:", response);
      
      if (response.status === 200) {
        toast.success("Email found. Redirecting...");
        router.push("/api/Frontend/DriverDetailsAll/Password/DriverVerify");
      } else {
        toast.error("Email does not exist.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-5">
      {/* Background Image */}
      <Image 
        src="/split.jpeg" 
        alt="Background" 
        fill 
        className="object-cover" 
      />
      
      <div className="absolute inset-0 flex flex-col justify-center items-center px-5 md:px-32">
        <div className="w-full max-w-lg bg-white/70 shadow-lg rounded-xl p-10 backdrop-blur-md">
          <h1 className="text-2xl font-semibold text-center mb-6">Email Verification</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-200 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
            />
            <button
              type="submit"
              className="bg-black text-white font-semibold rounded-lg px-5 py-3 w-full text-xl"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
