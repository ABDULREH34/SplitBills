'use client';
import ConfirmRidePopUp from 'src/app/api/Frontend/components/Home1/ConfirmRidePopUp';
import RidePopupPanel from 'src/app/api/Frontend/components/Home1/RidePopupPanel';
import DriverDetails from '@app/api/Frontend/DriverDetailsAll/DriverDetails/page';
import Link from 'next/link';
import React, { useState } from 'react';

const DriverHome = () => {
    const [isRidePopupVisible, setRidePopupVisible] = useState(true);
    const [confirmRidePopupPanel, setconfirmRidePopPanel] = useState(false);

    const handleAcceptRide = () => {
        setRidePopupVisible(false); // Hide the RidePopupPanel
        setconfirmRidePopPanel(true); // Show the ConfirmRidePopUp
    }

    return (
        <div className="h-screen">
            <div className="fixed p-6 top-0 items-center justify-between w-screen flex">
                <img className="w-16" src="/logo.jpeg" alt="Logo" />
                <Link
                    href="/DriverHome"
                    className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
                >
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-3/5">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt=""
                />
            </div>
            <div className="h-2/5 p-6">
                <DriverDetails />
            </div>
            {isRidePopupVisible && (
                <div
                    className="fixed w-full z-10 bottom-0 bg-white px-3 py-10 pt-12 transition-transform duration-300"
                    style={{ boxShadow: "0px -4px 6px rgba(0, 0, 0, 0.1)" }}
                >
                    <RidePopupPanel
                        setRidePopupPanel={setRidePopupVisible} 
                        onAccept={handleAcceptRide} // Pass the accept handler
                    />
                </div>
            )}

            {confirmRidePopupPanel && (
                <div
                    className="fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 pt-12 transition-transform duration-300"
                    style={{ boxShadow: "0px -4px 6px rgba(0, 0, 0, 0.1)" }}
                >
                    <ConfirmRidePopUp setconfirmRidePopPanel={setconfirmRidePopPanel} />
                </div>
            )}
        </div>
    );
};

export default DriverHome;