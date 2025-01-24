"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // To handle redirection

const InputItem = ({ type, locations = {}, onSubmit }) => {
  const [query, setQuery] = useState(""); // User input
  const [suggestions, setSuggestions] = useState([]); // Suggestions list

  const onInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      // Filter locations immediately based on input
      const filteredSuggestions = Object.keys(locations).filter((location) =>
        location.toLowerCase().startsWith(value.toLowerCase()) // Match from the beginning
      );

      setSuggestions(filteredSuggestions); // Update the suggestions
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion); // Set the selected suggestion into the input
    setSuggestions([]); // Clear suggestions after selection
    onSubmit(suggestion); // Pass the selected suggestion to the parent
  };

  const handleBlur = () => {
    setTimeout(() => setSuggestions([]), 200); // Clear suggestions after input loses focus
  };

  return (
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4 relative">
      <Image
        src={type === "source" ? "/Source.jpeg" : "/dest.jpeg"}
        width={15}
        height={15}
        alt={type === "source" ? "Pickup Location Icon" : "Dropoff Location Icon"}
        priority
      />
      <input
        type="text"
        placeholder={type === "source" ? "Pickup Location" : "Dropoff Location"}
        className="bg-transparent w-full outline-none"
        value={query}
        onChange={onInputChange}
        onBlur={handleBlur}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white shadow-lg rounded-md mt-2 max-h-60 overflow-y-auto w-full z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)} // Handle click on a suggestion
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SearchSection = () => {
  const [locations, setLocations] = useState({}); // Store parsed locations data
  const [loading, setLoading] = useState(true); // Loading state for fetch
  const [sourceLocation, setSourceLocation] = useState(""); // Track source location
  const [destinationLocation, setDestinationLocation] = useState(""); // Track destination location
  const [distance, setDistance] = useState(null); // Distance result
  const [duration, setDuration] = useState(null); // Duration result
  const [totalDistance,  setTotalDistance] = useState(null);
  const router = useRouter(); // Initialize the router for navigation

  const API_KEY = "AlzaSy8y4qb6gghIQfcUBXTwvmvP0vOvA8RN-vK"; // Google Maps API Key

  useEffect(() => {
    // Predefined list of locations
    const predefinedLocations = [
      "Cheeta Camp",
      "Thane",
      "Santacruz",
      "Bhandup",
      "Nerul",
      "Chembur",
      "Kurla",
      "Mulund",
      "Andheri",
      "Matunga",
      "Vikhroli",
      "Vashi",
      "Bandra",
      "Belapur",
      "Wadala",
      "Sion",
      "Govandi",
      "Kanjurmarg",
      "Dadar",
      "Ghatkopar",
      "Powai"
    ];

    // Convert the list into an object with null values
    const locationsObj = predefinedLocations.reduce((acc, location) => {
      acc[location] = null;
      return acc;
    }, {});

    setLocations(locationsObj); // Set the predefined locations
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading locations...</div>;
  }

  if (!Object.keys(locations).length) {
    return <div>Error loading locations. Please try again later.</div>;
  }

  const handleSourceSubmit = (location) => {
    setSourceLocation(location); // Set the source location when selected
  };

  const handleDestinationSubmit = (location) => {
    setDestinationLocation(location); // Set the destination location when selected
  };

  // Handle Submit button click to redirect
  const handleSubmit = async () => {
    if (sourceLocation && destinationLocation) {
      try {
        // Fetch distance using Google Maps API
        const response = await fetch(
          `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(
            sourceLocation
          )}&destinations=${encodeURIComponent(destinationLocation)}&key=${API_KEY}`
        );
        const data = await response.json();

        if (data.status === "OK") {
          const element = data.rows[0].elements[0];
          if (element.status === "OK") {
            const distance = element.distance.text;
            const duration = element.duration.text;
  
            // Log the distance and duration to the console
            console.log("Distance:", distance);
            console.log("Duration:", duration);
            setDistance(element.distance.text);
            setDuration(element.duration.text);
            setTotalDistance(element.distance.value / 1000);

            // Redirect with additional query parameters
            router.push(
              `/api/Frontend/Ride?source=${sourceLocation}&destination=${destinationLocation}&distance=${element.distance.value}&duration=${element.duration.value}`
            );
            
          } else {
            alert("Unable to calculate distance. Please try again.");
          }
        } else {
          alert("Error fetching distance data. Please check your input.");
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
    <div className="p-2 md:pd-6  rounded-lg">
      <p className="text-[20px] font-bold">Get a Ride</p>
      <div className="mb-4">
        <InputItem
          type="source"
          locations={locations}
          onSubmit={handleSourceSubmit} // Pass the submit function
        />
        {sourceLocation && <div>Selected Pickup: {sourceLocation}</div>}
      </div>
      <div className="mb-4">
        <InputItem
          type="destination"
          locations={locations}
          onSubmit={handleDestinationSubmit} // Pass the submit function
        />
        {destinationLocation && <div>Selected Dropoff: {destinationLocation}</div>}
      </div>
      {distance && duration && (
        <div className="mt-4">
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      )}
      {/* Submit Button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleSubmit}
          className="p-3 bg-black w-full mt-5 text-white rounded-lg fond-semibold"
        >
          Find a Trip
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
