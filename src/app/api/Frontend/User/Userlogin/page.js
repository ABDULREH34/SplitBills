"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';  // Import axios
import { toast } from 'react-toastify';

const Userlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();

        // Check if both email and password are filled
        if (!email || !password) {
            toast.error("Please enter both email and password.");
            return;
        }

        try {
            const response = await axios.post("/api/Backend/controller/userLogin", { email, password }, {
                withCredentials: true, // Ensure cookies are sent with the request
            });

            // Check if the response status is 200 (success)
            if (response.status === 200) {
                localStorage.setItem('AccessToken', response.data.accessToken);
                toast.success("Login successful!");
                router.push("/api/Frontend/DriverDetailsAll/DriverHome");
            } else {
                toast.error("Invalid credentials, please try again.");
            }
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);  
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }

        // Clear the form after submission
        setEmail('');
        setPassword('');
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
                    <form onSubmit={submitHandler}>
                        <h3 className="text-xl font-medium mb-4">What's your email?</h3>
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-200 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                            type="email"
                            placeholder="email@example.com"
                        />
                        <h3 className="text-xl font-medium mb-4">Enter Password</h3>
                        <input
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-200 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                            type="password"
                            placeholder="password"
                        />
                        
                        <p className="text-xl font-medium mb-4">
                            <Link href="/api/Frontend/User/Password/ForgetPassword" className="text-blue-600 font-medium">
                                Forgot your password?
                            </Link>
                        </p>
                        
                        <button
                            type="submit"
                            className="bg-black text-white font-semibold rounded-lg px-5 py-3 w-full text-xl"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center mt-6 text-lg">
                        New here?{' '}
                        <Link href="/api/Frontend/User/Usersignup" className="text-blue-600 font-medium">
                            Create new Account
                        </Link>
                    </p>
                </div>

                <div className="mt-8 w-full max-w-lg">
                    <Link
                        href="/api/Frontend/DriverDetailsAll/Driverlogin"
                        className="bg-[#2dd573] flex items-center justify-center text-white font-semibold rounded-lg px-5 py-3 w-full text-xl"
                    >
                        Sign in as Driver
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Userlogin;
