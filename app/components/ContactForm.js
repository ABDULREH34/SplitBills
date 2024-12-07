"use client";

import { useState } from "react";
import Image from 'next/image';
import { toast } from 'react-toastify';

export default function ContactForm() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Full Name:", fullname);
        console.log("Email:", email);
        console.log("Message:", message);

        const res = await fetch("/api", {  
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                fullname,
                email,
                message,
            }),
        });

        // Parse the response only once
        const response = await res.json();
        console.log('Backend Response:', response); 

        if (res.ok) {
            toast.success("Your message has been sent successfully!");
            setFullname("");
            setEmail("");
            setMessage("");
        } else {
            // Check if 'msg' exists and is an array of error messages
            if (Array.isArray(response.msg)) {
                response.msg.forEach((errorMsg) => {
                    toast.error(errorMsg); 
                });
            } else {
                toast.error("An unknown error occurred.");
            }
        }
    };

    return (
        <>
            <div className="flex justify-center items-center my-4">
                <Image
                    src="/contact.svg"
                    width={250}
                    height={200}
                    alt="contact"
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className="py-4 mt-4 border-t flex flex-col gap-5 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
            >
                <div>
                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                        type="text"
                        id="fullname"
                        placeholder="Enter Your Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        id="email"
                        placeholder="Enter Your Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                    </label>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        id="message"
                        placeholder="Write Your Message here..."
                        rows="5"
                        className="h-32 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                    Send
                </button>
            </form>
        </>
    );
}
