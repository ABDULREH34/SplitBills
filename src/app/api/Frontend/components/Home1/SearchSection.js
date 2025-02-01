"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import the router

const InputItem = ({ type, onSubmit }) => {
  const [query, setQuery] = useState(""); // User input
  const [suggestions, setSuggestions] = useState([]); // Suggestions list

  const onInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      try {
        // Fetch locations from the backend
        const response = await fetch(`/api/Backend/TaxiKey`);
        const locationsData = await response.json();

        // Show all locations if user starts typing
        setSuggestions(locationsData); // Show all locations as suggestions
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
        setSuggestions([]); // Clear suggestions on error
      }
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
  const [locations, setLocations] = useState([]); // Store parsed locations data
  const [loading, setLoading] = useState(true); // Loading state for fetch
  const [sourceLocation, setSourceLocation] = useState(""); // Track source location
  const [destinationLocation, setDestinationLocation] = useState(""); // Track destination location
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/Backend/TaxiKey"); // Call your API
        const data = await response.json();
        setLocations(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return <div>Loading locations...</div>;
  }

  const handleSourceSubmit = (location) => {
    setSourceLocation(location); // Set the source location when selected
  };

  const handleDestinationSubmit = (location) => {
    setDestinationLocation(location); // Set the destination location when selected
  };

  const handleSubmit = () => {
    if (sourceLocation && destinationLocation) {
      router.push(
        `/api/Frontend/Ride?source=${sourceLocation}&destination=${destinationLocation}`
      ); // Redirect when button is clicked
    } else {
      alert("Please select both source and destination locations."); // Alert if locations are not selected
    }
  };

  return (
    <div className="p-2 md:pd-6 rounded-lg">
      <p className="text-[20px] font-bold">Get a Ride</p>
      <div className="mb-4">
        <InputItem
          type="source"
          onSubmit={handleSourceSubmit} // Pass the submit function
        />
        {sourceLocation && <div>Selected Pickup: {sourceLocation}</div>}
      </div>
      <div className="mb-4">
        <InputItem
          type="destination"
          onSubmit={handleDestinationSubmit} // Pass the submit function
        />
        {destinationLocation && <div>Selected Dropoff: {destinationLocation}</div>}
      </div>
      {/* Button Added back */}
      <div className="mt-4 text-center">
        <button
          onClick={handleSubmit} // Trigger router.push when button is clicked
          className="p-3 bg-black w-full mt-5 text-white rounded-lg font-semibold"
        >
          Find a Trip
        </button>
      </div>
    </div>
  );
};

export default SearchSection;
