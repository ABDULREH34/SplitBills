"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import InputItem to prevent SSR-related issues
const InputItem = dynamic(() => import("./InputItem"), { ssr: false });

const SearchSection = () => {
  const [sourceLocation, setSourceLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const router = useRouter();

  const GOOGLE_MAPS_API_KEY = "AlzaSycMSknWR1JLXyUHqauACTc0YB7cCl6zr1x"; // Replace with valid key

  const handleSubmit = async () => {
    if (sourceLocation && destinationLocation) {
      try {
        const response = await fetch(
          `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(
            sourceLocation
          )}&destinations=${encodeURIComponent(destinationLocation)}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();

        if (data.status === "OK") {
          const element = data.rows[0].elements[0];
          if (element.status === "OK") {
            setDistance(element.distance.text);
            setDuration(element.duration.text);

            router.push(
              `/api/Frontend/Ride?pickup=${encodeURIComponent(sourceLocation)}&destination=${encodeURIComponent(destinationLocation)}&distance=${element.distance.value}&duration=${element.duration.value}`
            );
          } else {
            alert("Unable to calculate distance. Please try again.");
          }
        } else {
          alert("Error fetching distance data.");
        }
      } catch (error) {
        console.error("Error fetching distance:", error);
        alert("Failed to fetch distance data.");
      }
    } else {
      alert("Please select both source and destination locations.");
    }
  };

  return (
    <div className="p-2 md:p-6 rounded-lg">
      <p className="text-[20px] font-bold">Get a Ride</p>
      <div className="mb-4">
        <InputItem type="source" onSubmit={setSourceLocation} />
        {sourceLocation && <div>Selected Pickup: {sourceLocation}</div>}
      </div>
      <div className="mb-4">
        <InputItem type="destination" onSubmit={setDestinationLocation} />
        {destinationLocation && <div>Selected Dropoff: {destinationLocation}</div>}
      </div>
      {distance && duration && (
        <div className="mt-4">
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      )}
      <div className="mt-4 text-center">
        <button
          onClick={handleSubmit}
          className="p-3 bg-black w-full mt-5 text-white rounded-lg font-semibold"
        >
          Find a Trip
        </button>
      </div>
    </div>
  );
};

export default SearchSection;