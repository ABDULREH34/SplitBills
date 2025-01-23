"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";

const Usersignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newUserData = {
            username: {
                firstname: firstName,
                lastname: lastName,
            },
            email,
            password,
        };

        try {
            const response = await axios.post(
                "/api/Backend/controller/userRegister",
                newUserData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.status === 201) {
                localStorage.setItem('AccessToken', response.data.accessToken);
                toast.success("User registered successfully! Please verify your account.");
                router.push("/api/Frontend/User/Userverify");
                setEmail("");
                setFirstName("");
                setLastName("");
                setPassword("");

                
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center relative px-5">
            

            {/* Background Image */}
            <Image
                src="/split.jpeg"
                alt="Split Bills Background"
                fill
                className="object-cover"
            />

            <div className="absolute inset-0 flex flex-col justify-center items-center px-5 md:px-32">
                <div className="w-full max-w-md bg-white/70 shadow-lg rounded-xl p-10 backdrop-blur-md">
                    <img className="w-24 mb-8 mx-auto" src="/logo.jpeg" alt="Logo" />
                    <form onSubmit={submitHandler}>
                        <h3 className="text-xl font-medium mb-4">What's your name?</h3>
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <input
                                required
                                className="bg-gray-200 bg-opacity-50 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={loading}
                            />
                            <input
                                required
                                className="bg-gray-200 bg-opacity-50 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={loading}
                            />
                        </div>

                        <h3 className="text-xl font-medium mb-4">What's your email?</h3>
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-200 bg-opacity-50 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                            type="email"
                            placeholder="email@example.com"
                            disabled={loading}
                        />
                        <h3 className="text-xl font-medium mb-4">Enter Password</h3>
                        <input
                            className="bg-gray-200 bg-opacity-50 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            placeholder="password"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="bg-black text-white font-semibold rounded-lg px-5 py-3 w-full text-lg"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create account"}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-lg">
                        Already have an account?{" "}
                        <Link
                            href="/api/Frontend/User/Userlogin"
                            className="text-blue-600 font-medium"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
                <div className="mt-6 w-full max-w-md text-center bg-black text-white">
                    <p className="text-xs leading-tight">
                        This site is protected by reCAPTCHA and the{" "}
                        <span className="underline">Google Privacy Policy</span> and{" "}
                        <span className="underline">Terms of Service apply</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Usersignup;
