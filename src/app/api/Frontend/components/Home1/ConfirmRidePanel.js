"use client";

import React from "react";
import Image from "next/image";
import { MapPin, DollarSign, Ruler } from "lucide-react";
import { toast } from "react-toastify";

const ConfirmRidePanel = ({ ride, pickupLocation, destinationLocation, totalDistance, onClose, onConfirm }) => {

  const handleConfirm = async () => {
    const rideData = {
      pickupLocation,
      destinationLocation,
      totalDistance,
      price: ride?.discountPrice || 0,
    };

    try {
      const response = await fetch('/api/Backend/controller/saverequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rideData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Ride saved:', data);
        toast.success("Your data has been successfully stored");
        onClose();
      } else {
        const error = await response.json();
        toast.error("Failed to save your data.");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center bg-white rounded-lg shadow-lg">
      {/* Close Panel */}
      <div className="flex justify-center items-center mb-4 cursor-pointer" onClick={onClose}>
        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>

      {/* Title */}
      <div className="text-center font-bold text-2xl mb-4 text-gray-700">Confirm Your Ride</div>

      {/* Ride Image */}
      <div className="flex flex-col items-center gap-4 mb-4">
        <Image
          src={ride.image || "/placeholder.png"}
          alt={ride.name || "Ride"}
          width={150}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Ride Details */}
      <div className="text-center mb-4">
        <p className="font-semibold text-lg text-gray-800">{ride.name}</p>
        <p className="text-sm text-gray-500">{ride.description}</p>
      </div>

      {/* Ride Info (Pickup, Destination, Distance, and Price) */}
      <div className="w-full text-left mb-6 space-y-4">
        {/* Pickup */}
        <div className="flex items-start gap-2">
          <MapPin className="text-blue-500" />
          <p className="font-medium text-gray-700">{pickupLocation || "Not available"}</p>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-2">
          <MapPin className="text-green-500" />
          <p className="font-medium text-gray-700">{destinationLocation || "Not available"}</p>
        </div>

        {/* Distance */}
        <div className="flex items-center gap-2">
          <Ruler className="text-purple-500" />
          <p className="font-medium text-gray-700">{totalDistance?.toFixed(2)} km</p>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <DollarSign className="text-yellow-500" />
          <p className="font-medium text-xl text-gray-800">
            ₹{ride?.discountPrice || "Not available"}
          </p>
        </div>
      </div>

      {/* Confirm and Cancel Buttons */}
      <div className="w-full space-y-4">
        <button
          onClick={handleConfirm} // Call handleConfirm function on click
          className="bg-black w-full text-white font-semibold p-2 px-10 rounded-lg"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmRidePanel;
