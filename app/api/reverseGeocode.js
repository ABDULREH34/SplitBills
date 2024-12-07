// {/*"use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import dynamic from "next/dynamic";

// // Function to fetch suggestions from LocationIQ API using the API Key
// const fetchSuggestions = async (query) => {
//   if (!query) return [];
//   try {
//     // Replace this with the LocationIQ API endpoint and your API key
//     const response = await fetch(
//       `https://us1.locationiq.com/v1/autocomplete.php?q=${query}&key=${process.env.NEXT_PUBLIC_API_KEY}&format=json`
//     );
//     const data = await response.json();
//     return data || []; // Return the suggestions from the API response
//   } catch (error) {
//     console.error("Error fetching suggestions:", error);
//     return [];
//   }
// };

// // Dynamically import the InputItem component to disable SSR
// const InputItem = dynamic(() => import("./InputItem"), {
//   ssr: false, // Disable SSR for this component
// });

// export default function InputItemComponent({ type }) {
//   const [query, setQuery] = useState(""); // To hold the query input by user
//   const [suggestions, setSuggestions] = useState([]); // To hold fetched suggestions

//   // Handle user input change and fetch suggestions
//   const handleInputChange = async (e) => {
//     const value = e.target.value;
//     setQuery(value);

//     // Fetch suggestions if query length exceeds 2 characters
//     if (value.length > 2) {
//       const results = await fetchSuggestions(value);
//       setSuggestions(results);
//     } else {
//       setSuggestions([]); // Clear suggestions if input is less than 3 characters
//     }
//   };

//   // Handle suggestion click and update the input field
//   const handleSuggestionClick = (suggestion) => {
//     setQuery(suggestion.display_name); // Update input with the place name
//     setSuggestions([]); // Clear suggestions after selection
//   };

//   return (
//     <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
//       <Image
//         src={type === "source" ? "/Source.jpeg" : "/dest.jpeg"}
//         width={15}
//         height={15}
//         alt="Pickup Location Icon"
//         priority
//       />
//       <div className="relative w-full">
//         <input
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           placeholder={type === "source" ? "Pickup Location" : "Dropoff Location"}
//           className="bg-transparent w-full outline-none p-2"
//         />
//         {/* Display suggestions if available */}
//       {/*  {suggestions.length > 0 && (
//           <ul className="absolute bg-white shadow-md rounded-lg mt-1 max-h-60 overflow-y-auto w-full z-10">
//             {suggestions.map((item, index) => (
//               <li
//                 key={index}
//                 className="p-2 hover:bg-gray-200 cursor-pointer"
//                 onClick={() => handleSuggestionClick(item)}
//               >
//                 {item.display_name} {/* This is the full place name */}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }  
