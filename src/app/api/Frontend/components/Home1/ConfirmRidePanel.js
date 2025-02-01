"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; 
import Image from "next/image";

const ConfirmRidePanel = ({ ride, onClose, onConfirm }) => {
  const [fareData, setFareData] = useState(null);
  const searchParams = useSearchParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pickup = searchParams.get("pickup");
        const destination = searchParams.get("destination");

       
        if (!pickup || !destination) return;

        const response = await fetch(`/api/Backend/TaxiFetch?pickup=${pickup}&destination=${destination}`);
        const data = await response.json();
        setFareData(data);
      } catch (error) {
        console.error("Error fetching fare data:", error);
      }
    };

    fetchData();
  }, [searchParams]); 

  return (
    <div>
      {/* Close Panel */}
      <div className="flex justify-center items-center mb-4 cursor-pointer" onClick={onClose}>
        <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>

      {/* Title */}
      <div className="text-center font-bold text-lg mb-4">Confirm your Ride</div>

      {/* Ride Image */}
      <div className="flex flex-col items-center gap-4">
        <Image src={ride.image || "/placeholder.png"} alt={ride.name || "Ride"} width={150} height={80} className="object-contain" />
      </div>

      {/* Ride Details */}
      <div className="mt-4 px-4">
        <p className="font-bold">{ride.name}</p>
        <p className="text-gray-500 text-sm">{ride.description}</p>
      </div>

      {/* Fare Details */}
      {fareData && (
        <div className="mt-4 px-4">
          <div className="flex items-center gap-2">
            <span className="font-bold">🚩 {fareData.pickup}</span>
            <span className="text-gray-500">{fareData.destination}</span>
          </div>
          <p className="text-gray-500 text-sm">{fareData.km} km</p>
          <p className="text-lg font-bold mt-2">₹{fareData.price}</p>
          <p className="text-gray-500 text-sm">Cash</p>
        </div>
      )}

      {/* Confirm Button */}
      <button onClick={onConfirm} className="w-full bg-black text-white text-lg font-bold py-2 rounded-md mt-6">
        Confirm
      </button>
    </div>
  );
};

export default ConfirmRidePanel;
