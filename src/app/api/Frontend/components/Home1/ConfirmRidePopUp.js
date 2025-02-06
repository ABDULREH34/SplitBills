import { useState, useEffect } from "react";
import Link from "next/link";
import { IndianRupee } from "lucide-react"; // Import Indian Rupee icon

const ConfirmRidePopUp = ({ setconfirmRidePopPanel }) => {
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch latest ride details from backend
  const fetchRideDetails = async () => {
    try {
      const response = await fetch("/api/Backend/controller/FetchRideDetails", { cache: "no-store" });
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        // Sort rides by date in descending order and get the latest ride
        const sortedRides = data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRide(sortedRides[0]);
      } else {
        console.error("Error fetching ride details:", data.message);
      }
    } catch (error) {
      console.error("Failed to fetch ride data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRideDetails();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading ride details...</p>;
  if (!ride) return <p className="text-center text-gray-500">No ride details available.</p>;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-6 rounded-t-2xl shadow-lg">
      <h5 className="p-1 text-center w-full cursor-pointer" onClick={() => setconfirmRidePopPanel(false)}>
        <i className="text-3xl text-gray-400 ri-arrow-down-s-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5 text-center">Confirm this ride to Start</h3>

      {/* Rider Info */}
      <div className="flex items-center justify-between p-3 bg-black rounded-lg">
        <div className="flex items-center gap-3">
          <img className='h-10 w-10 rounded-full object-cover' src="/people.jpg" alt='' />
          <h2 className="text-lg font-medium text-white">{ride?.riderName || "ABC Rider"}</h2>
        </div>
        <h5 className="text-lg font-semibold text-white">{ride?.totalDistance ? `${ride.totalDistance} KM` : "N/A"}</h5>
      </div>

      {/* Ride Details */}
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-gray-600 w-5 h-5 ri-map-pin-2-fill"></i>
          <h3 className="text-lg font-medium">{ride?.pickupLocation || "Unknown Pickup"}</h3>
        </div>

        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-gray-600 w-5 h-5 ri-map-pin-2-fill"></i>
          <h3 className="text-lg font-medium">{ride?.destinationLocation || "Unknown Destination"}</h3>
        </div>

        <div className="flex items-center gap-5 p-3">
          <i className="text-yellow-500 w-5 h-5 ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">{ride?.price || "0"}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash Payment</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 w-full">
        <form>
          <input className="bg-[#eee] px-6 py-4 font-mono text-lg w-full mt-3" placeholder="Enter OTP" />
          <Link href="/api/Frontend/DriverDetailsAll/DriverRiding" className="bg-black mt-2 flex justify-center w-full text-white font-semibold p-2 px-10 rounded-lg">
            Confirm
          </Link>
          <button
            onClick={() => setconfirmRidePopPanel(false)}
            className="mt-2 w-full bg-red-600 text-white font-semibold p-2 px-10 rounded-lg"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
