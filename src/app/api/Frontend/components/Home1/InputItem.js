"use client";  // ✅ Ensure client-side rendering

import React, { useState, useEffect } from "react";
import Image from "next/image";

const InputItem = ({ type, onSubmit }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  
  const LOCATIONIQ_API_KEY = "pk.d37d22e1bde7aa5c727353505da89f95"; // Replace with valid key

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://api.locationiq.com/v1/autocomplete?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(input)}&limit=5`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setSuggestions(data.map((item) => item.display_name));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (query.length > 2) {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    onSubmit(suggestion);
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
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white shadow-lg rounded-md mt-2 max-h-60 overflow-y-auto w-full z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputItem;
