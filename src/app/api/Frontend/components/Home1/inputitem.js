"use client";
import React, { useState } from "react";
import Image from "next/image";

const InputItem = ({ type }) => {
  const [query, setQuery] = useState(""); // Input query
  const [suggestions, setSuggestions] = useState([]); // Suggestions from API
  const [loading, setLoading] = useState(false); // Loading state

  // Real-time input change handler
  const onInputChange = (e) => {
    const value = e.target.value;
    setQuery(value); // Update the query state
    // Call your function to fetch suggestions here (debounced if necessary)
  };

  // Clear suggestions on input blur
  const handleBlur = () => {
    setTimeout(() => setSuggestions([]), 200); // Delay to allow click on suggestions
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
        onChange={onInputChange} // Ensure the input updates the query state
        onBlur={handleBlur}
      />
      {loading && <div className="absolute top-0 right-0 mt-3 mr-3">Loading...</div>}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white shadow-lg rounded-md mt-2 max-h-60 overflow-y-auto w-full z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setQuery(suggestion.placeName);
                setSuggestions([]); // Clear suggestions on selection
              }}
            >
              {suggestion.placeName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputItem;