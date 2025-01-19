"use client";
import Link from 'next/link'; 
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; 

const Userlogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [OTP, setOTP] = useState('');
    const [UserData, setUserData] = useState('');
    const router = useRouter();  

    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            email: email,
            password,
        });

        router.push('/api/Frontend/DriverDetailsAll/DriverHome');
        
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
                <div className="w-full max-w-lg bg-white/70 shadow-lg rounded-xl p-10 backdrop-blur-md">
                    <img className="w-24 mb-6 mx-auto" src="/logo.jpeg" alt="Logo" />
                    <form onSubmit={submitHandler}>
                        <h3 className="text-xl font-medium mb-4">Enter your email</h3>
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-200 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                            type="email"
                            placeholder="email@example.com"
                        />
                        <h3 className="text-xl font-medium mb-4">Enter OTP</h3>
                        <input
                            required
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value)}
                            className="bg-gray-200 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                            type="OTP"
                            placeholder="Enter OTP"
                        />
                        
                        <h3 className="text-xl font-medium mb-4">Reset Password</h3>
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
                            className="bg-black text-white font-semibold rounded-lg px-5 py-3 w-full text-xl mt-4"
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