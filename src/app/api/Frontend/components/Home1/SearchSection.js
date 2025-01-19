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

const MainComponent = () => {
  const [locations, setLocations] = useState({}); // Store parsed locations data
  const [loading, setLoading] = useState(true); // Loading state for fetch
  const [sourceLocation, setSourceLocation] = useState(""); // Track source location
  const [destinationLocation, setDestinationLocation] = useState(""); // Track destination location
  const router = useRouter(); // Initialize the router for navigation

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
  const handleSubmit = () => {
    if (sourceLocation && destinationLocation) {
      // Redirect to another page (you can replace the URL with your desired path)
      router.push(`/api/Frontend/Ride?source=${sourceLocation}&destination=${destinationLocation}`);
    } else {
      alert("Please select both source and destination locations.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-center text-xl font-bold mb-4">Select Locations</h1>
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
      {/* Submit Button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MainComponent;
