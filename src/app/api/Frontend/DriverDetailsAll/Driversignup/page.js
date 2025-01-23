"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Driversignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newDriverData = {
            username: {
                firstname: firstName,
                lastname: lastName,
            },
            email,
            password,
            vehicle: {
                vehicleColor,
                vehiclePlate,
                vehicleCapacity,
                vehicleType,
            },
        };

        try {
            const response = await axios.post(
                "/api/Backend/controller/DriverRegister",
                newDriverData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.status === 201) {
                toast.success("Driver registered successfully! Please verify your account.");
                router.push("/api/Frontend/DriverDetailsAll/Driververify");
                setEmail("");
                setFirstName("");
                setLastName("");
                setPassword("");
                setVehicleColor("");
                setVehiclePlate("");
                setVehicleCapacity("");
                setVehicleType("");
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
            <div className="absolute inset-0 flex flex-col justify-center items-center px-5 md:px-20">
                <div className="w-full max-w-md bg-white/70 backdrop-blur-md shadow-lg rounded-xl p-6 md:p-10">
                    <img className="w-24 mb-6 mx-auto" src="/logo.jpeg" alt="Logo" />
                    <form onSubmit={submitHandler}>
                        <h3 className="text-xl font-medium mb-2">What's our Driver's name?</h3>
                        <div className="flex flex-col gap-4 mb-6 md:flex-row">
                            <input
                                required
                                className="bg-gray-200 w-full md:w-1/2 rounded-lg px-5 py-3 border text-lg placeholder:text-base"
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                disabled={loading}
                            />
                            <input
                                required
                                className="bg-gray-200 w-full md:w-1/2 rounded-lg px-5 py-3 border text-lg placeholder:text-base"
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <h3 className="text-xl font-medium mb-2">What's our Driver email?</h3>
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-200 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                            type="email"
                            placeholder="email@example.com"
                            disabled={loading}
                        />
                        <h3 className="text-xl font-medium mb-4">Enter Password</h3>
                        <input
                            className="bg-gray-200 mb-6 rounded-lg px-5 py-3 border w-full text-lg placeholder:text-base"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            placeholder="password"
                            disabled={loading}
                        />
                        <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
                        <div className="flex gap-4 mb-7">
                            <input
                                required
                                className="bg-gray-200 w-full md:w-1/2 rounded-lg px-5 py-3 border text-lg placeholder:text-base"
                                type="text"
                                placeholder="Vehicle Color"
                                value={vehicleColor}
                                onChange={(e) => setVehicleColor(e.target.value)}
                                disabled={loading}
                            />
                            <input
                                required
                                className="bg-gray-200 w-full md:w-1/2 rounded-lg px-5 py-3 border text-lg placeholder:text-base"
                                type="text"
                                placeholder="Vehicle Plate"
                                value={vehiclePlate}
                                onChange={(e) => setVehiclePlate(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className="flex gap-4 mb-7">
                            <input
                                required
                                className="bg-gray-200 w-full md:w-1/2 rounded-lg px-5 py-3 border text-lg placeholder:text-base"
                                type="number"
                                placeholder="Vehicle Capacity"
                                value={vehicleCapacity}
                                onChange={(e) => setVehicleCapacity(e.target.value)}
                                disabled={loading}
                            />
                            <select
                                required
                                className="bg-gray-200 w-full md:w-1/2 rounded-lg px-5 py-3 border text-lg placeholder:text-base"
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                                disabled={loading}
                            >
                                <option value="" disabled>
                                    Select Vehicle Type
                                </option>
                                <option value="Premier 4seater Car">Premier 4-seater Car</option>
                                <option value="SplitXL 6seater Car">SplitXL 6-seater Car</option>
                                <option value="Split Go 4seater Car">Split Go 4-seater Car</option>
                                <option value="Split Care 4seater Car">Split Care 4-seater Car</option>
                                <option value="Split Pet 4seater Car">Split Pet 4-seater Car</option>
                                <option value="Other">More options</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-black text-white font-semibold rounded-lg px-5 py-3 w-full text-xl"
                            disabled={loading}
                        >
                            {loading ? "Creating Driver Account..." : "Create Driver Account"}
                        </button>
                    </form>
                    <p className="text-center mt-6 text-lg text-gray-800">
                        Already have an account?{" "}
                        <Link href="/api/Frontend/DriverDetailsAll/Driverlogin" className="text-blue-600">
                            Login here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Driversignup;
