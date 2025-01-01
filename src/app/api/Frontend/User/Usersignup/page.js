"use client";
import Link from 'next/link'; 
import React, { useState } from 'react';
import Image from 'next/image'; // Import Image for background

const Usersignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUserData = {
            username: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
        };
        setUserData(newUserData);
        console.log(newUserData);

        // Clear form fields
        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
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
                {/* Adjusted the size of the container */}
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
                            />
                            <input
                                required
                                className="bg-gray-200 bg-opacity-50 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
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
                        />
                        <h3 className="text-xl font-medium mb-4">Enter Password</h3>
                        <input
                            className="bg-gray-200 bg-opacity-50 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            placeholder="password"
                        />
                        <button
                            type="submit"
                            className="bg-black text-white font-semibold rounded-lg px-5 py-3 w-full text-lg"
                        >
                           Create account 
                        </button>
                    </form>
                    <p className="text-center mt-6 text-lg">
                        Already have an account?{' '}
                        <Link href="/Userlogin" className="text-blue-600 font-medium">
                            Login here
                        </Link>
                    </p>
                </div>
                <div className="mt-6 w-full max-w-md text-center bg-black text-white">
                    <p className="text-xs leading-tight">
                        This site is protected by reCAPTCHA and the{' '}
                        <span className="underline">Google Privacy Policy</span> and{' '}
                        <span className="underline">Terms of Service apply</span>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Usersignup;
