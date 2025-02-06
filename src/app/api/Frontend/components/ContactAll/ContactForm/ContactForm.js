"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ContactForm() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            const res = await fetch("/api/Backend/controller/userContact", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    message,
                }),
            });

            const response = await res.json(); // Parse backend response
            console.log("Backend Response:", response);

            if (res.ok) {
                toast.success("Your message has been sent successfully!");
                setFullname("");
                setEmail("");
                setMessage("");
            } else {
                if (response.error) {
                    toast.error(response.error); // Display specific error
                } else {
                    toast.error("An unknown error occurred.");
                }
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            toast.error("Failed to send message. Please try again later.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <>
            <div className="flex justify-center items-center my-4">
                <Image
                    src="/contact.svg"
                    width={250}
                    height={200}
                    alt="Contact"
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className="py-4 mt-4 border-t flex flex-col gap-5 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg"
            >
                <div>
                    <label
                        htmlFor="fullname"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Full Name
                    </label>
                    <input
                        onChange={(e) => setFullname(e.target.value)}
                        value={fullname}
                        type="text"
                        id="fullname"
                        placeholder="Enter Your Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        id="email"
                        placeholder="Enter Your Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Message
                    </label>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        id="message"
                        placeholder="Write Your Message here..."
                        rows="5"
                        className="h-32 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    disabled={loading} // Disable button during submission
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </form>
            <div className="flex justify-center mt-6">
                <Link href="/api/Frontend/home" passHref>
                    <button
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                        Go Home
                    </button>
                </Link>
            </div>
        </>
    );
}
