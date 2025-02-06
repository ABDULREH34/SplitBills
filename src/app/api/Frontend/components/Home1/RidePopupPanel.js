import { useState, useEffect } from "react";
import Image from "next/image";
import { IndianRupee } from "lucide-react"; 
import io from "socket.io-client";

const RidePopupPanel = ({ setRidePopupPanel = () => {}, onAccept = () => {} }) => {
    const [latestRide, setLatestRide] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch latest ride request
    const fetchLatestRide = async () => {
        try {
            const response = await fetch("/api/Backend/controller/FetchRideDetails", { cache: "no-store" });
            const data = await response.json();

            if (data.success && data.data.length > 0) {
                const sortedRides = data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setLatestRide(sortedRides[0]);
            } else {
                setLatestRide(null);
                console.error("Error fetching ride requests:", data.message);
            }
        } catch (error) {
            console.error("Failed to fetch ride data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLatestRide();
        const interval = setInterval(fetchLatestRide, 10000);

        const socket = io("/", { path: "/api/socket" });
        socket.on("newRideRequest", (newRide) => {
            setLatestRide(newRide);
        });

        return () => {
            clearInterval(interval);
            socket.disconnect();
        };
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading ride details...</p>;
    if (!latestRide) return <p className="text-gray-500 text-center">No ride requests available.</p>;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-2xl shadow-lg">
            <h5 className="p-1 text-center w-full cursor-pointer" 
                onClick={() => typeof setRidePopupPanel === "function" && setRidePopupPanel(false)}>
                <i className="text-3xl text-gray-400 ri-arrow-down-s-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5 text-left">New Ride Available</h3>

            <div className="mb-5">
                <div className="flex items-center justify-between p-3 bg-black rounded-lg">
                    <div className="flex items-center gap-3">
                        <img className='h-10 w-10 rounded-full object-cover' src="/people.jpg" alt='' />
                        <h2 className="text-lg font-medium text-white">{latestRide?.riderName || "ABC Rider"}</h2>
                    </div>
                    <h5 className="text-lg font-semibold text-white">{latestRide?.totalDistance ? `${latestRide.totalDistance} KM` : "N/A"}</h5>
                </div>

                <div className="w-full mt-5">
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-gray-600 w-5 h-5 ri-map-pin-2-fill"></i>
                        <h3 className="text-lg font-medium">{latestRide?.pickupLocation || "Unknown Pickup"}</h3>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-gray-600 w-5 h-5 ri-map-pin-2-fill"></i>
                        <h3 className="text-lg font-medium">{latestRide?.destinationLocation || "Unknown Destination"}</h3>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                        <i className="text-yellow-500 w-5 h-5 ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">{latestRide?.price || "0"}</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash Payment</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 w-full">
                <button onClick={() => onAccept(latestRide)} className="bg-black w-full text-white font-semibold p-2 px-10 rounded-lg">
                    Accept
                </button>
                <button onClick={() => typeof setRidePopupPanel === "function" && setRidePopupPanel(false)} 
                        className="mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg">
                    Ignore
                </button>
            </div>
        </div>
    );
};

export default RidePopupPanel;
