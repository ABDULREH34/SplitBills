"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import FinishRidePanel from 'src/app/api/Frontend/components/Home1/FinishRidePanel';

const DriverRiding = () => {
    const [isFinishRidePanelVisible, setIsFinishRidePanelVisible] = useState(false);

    return (
        <div className="h-screen">
            <div className="fixed p-6 top-0 items-center justify-between w-screen flex">
                <img className="w-16" src="logo.jpeg" alt="Logo" />
                <Link
                    href="/DriverHome"
                    className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
                >
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-4/5">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt=""
                />
            </div>

            <div className="h-1/5 p-6 flex items-center justify-between relative bg-black">
                <h5
                    className="p-1 text-center w-[95%] absolute top-0"
                    onClick={() => setIsFinishRidePanelVisible(true)}
                >
                    <i className="text-3xl text-gray-200 ri-arrow-up-s-line"></i>
                </h5>
                <h4 className="text-xl font-semibold text-white">4 KM away</h4>
                <button
                    className="bg-gray-700 text-white font-semibold p-3 px-10 rounded-lg"
                    onClick={() => setIsFinishRidePanelVisible(true)}
                >
                    Complete Ride
                </button>
            </div>

            {isFinishRidePanelVisible && (
                <div
                    className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 transition-transform duration-300"
                    style={{ boxShadow: "0px -4px 6px rgba(0, 0, 0, 0.1)" }}
                >
                    <FinishRidePanel
                        setfinishRidePanel={setIsFinishRidePanelVisible}
                    />
                </div>
            )}
        </div>
    );
};

export default DriverRiding;
