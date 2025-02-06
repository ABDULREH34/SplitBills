'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import io from "socket.io-client";
import { MapPin, DollarSign } from "lucide-react";
import RidePopupPanel from "@/app/api/Frontend/components/Home1/RidePopupPanel";

export default function DriverDashboard() {
  const [rideRequests, setRideRequests] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [ridePopupPanel, setRidePopupPanel] = useState(false);

  useEffect(() => {
    const fetchRideRequests = async () => {
      try {
        const response = await fetch("/api/Backend/controller/FetchRideDetails", { cache: "no-store" });
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setRideRequests(data.data);
        } else {
          console.error("Invalid response format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch ride data:", error);
      }
    };

    fetchRideRequests();

    const socket = io("/", { path: "/api/socket" });
    socket.on("newRideRequest", (newRide) => {
      setRideRequests((prevRequests) => [newRide, ...prevRequests]);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full p-5 mt-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">New Ride Available</h3>
        {rideRequests.length > 0 ? (
          rideRequests.map((ride, index) => (
            <div key={index} className="mt-4 bg-white rounded-lg shadow cursor-pointer" onClick={() => setSelectedRide(ride)}>
              <div className="bg-black text-white p-4 flex justify-between items-center rounded-t-lg">
                <div className="flex items-center gap-3">
                  <Image src={ride.riderProfile || "/driverimg.png"} alt="Rider" width={40} height={40} className="rounded-full" />
                  <span className="font-medium">{ride.riderName || "ABC Rider"}</span>
                </div>
                <span className="font-medium">{ride.totalDistance ? `${ride.totalDistance} KM` : "N/A"}</span>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-gray-600 w-5 h-5" />
                  <p className="font-medium">{ride.pickupLocation || "Unknown Pickup"}</p>
                </div>

                <div className="flex items-center gap-3">
                  <DollarSign className="text-yellow-500 w-5 h-5" />
                  <p className="font-medium">{ride.price || "0"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No ride requests available.</p>
        )}
      </div>

      {ridePopupPanel && selectedRide && <RidePopupPanel ride={selectedRide} setRidePopupPanel={setRidePopupPanel} />}
    </div>
  );
}
