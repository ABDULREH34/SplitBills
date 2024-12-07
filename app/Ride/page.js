"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "app/components/Header";
import { User } from "lucide-react";


const Ride = () => {
  // State to track the selected card
  const [selectedCard, setSelectedCard] = useState(null);

  // Function to handle card click and set selected card
  const handleCardClick = (id) => {
    if (selectedCard === id) {
      setSelectedCard(null); // Deselect if the card is clicked again
    } else {
      setSelectedCard(id); // Select the clicked card
    }
  };

  return (
    <>
      {/* Header */}
      <Header />

      
        

      {/* Page Title */}
      <div className="flex items-center justify-center font-bold text-black mt-2 text-3xl">
        Choose a ride
      </div>

      {/* Section: Recommended */}
      <div className="flex items-center justify-center font-bold text-black mt-4 text-xl">
        Recommended
      </div>

      {/* Recommended Cards */}
      <div>
        {/* Card 1 */}
        <div
          onClick={() => handleCardClick(1)}
          className={`max-w-md mx-auto border rounded-lg p-4 mt-2 shadow-lg flex items-center 
            ${selectedCard === 1 ? "border-black" : "hover:border-black"} 
            hover:shadow-xl transition-all duration-300 cursor-pointer`}
        >
          <div className="w-16 h-16">
            <Image
              src="/car1.jpg"
              alt="Car"
              width={200}
              height={200}
              className="object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 ml-4 flex flex-col ">
            <h2 className="text-lg font-bold flex items-center">
              Premier <User fill="text-black" size={15} className="ml-2" /> <span className="text-sm">4</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Comfortable sedans, top-quality drivers</p>
          </div>
          <div className="text-right">
          <p className="text-green-500 font-bold text-sm">25% off</p>
            <p className="text-green-500 font-bold text-lg">₹176.98</p>
            <p className="text-gray-400 line-through text-sm">₹235.98</p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => handleCardClick(2)}
          className={`max-w-md mx-auto border rounded-lg p-4 mt-2 shadow-lg flex items-center 
            ${selectedCard === 2 ? "border-black" : "hover:border-black"} 
            hover:shadow-xl transition-all duration-300 cursor-pointer`}
        >
          <div className="w-16 h-16">
            <Image
              src="/car2.webp"
              alt="Car"
              width={200}
              height={200}
              className="object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 ml-4 flex flex-col">
            <h2 className="text-lg font-bold flex items-center">
              SplitXL <User fill="text-black" size={15} className="ml-2" /> <span className="text-sm">6</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Comfortable SUVs</p>
          </div>
          <div className="text-right">
          <p className="text-green-500 font-bold text-sm">25% off</p>
            <p className="text-green-500 font-bold text-lg">₹273.64</p>
            <p className="text-gray-400 line-through text-sm">₹348.64</p>
          </div>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => handleCardClick(3)}
          className={`max-w-md mx-auto border rounded-lg p-4 mt-2 shadow-lg flex items-center 
            ${selectedCard === 3 ? "border-black" : "hover:border-black"} 
            hover:shadow-xl transition-all duration-300 cursor-pointer`}
        >
          <div className="w-16 h-16">
            <Image
              src="/car3.jpg"
              alt="Car"
              width={200}
              height={200}
              className="object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 ml-4 flex flex-col">
            <h2 className="text-lg font-bold flex items-center">
              Split Go <User fill="text-black"  size={15} className="ml-2" /> <span className="text-sm">4</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Affordable compact rides</p>
          </div>
          <div className="text-right">
          <p className="text-green-500 font-bold text-sm">25% off</p>
            <p className="text-green-500 font-bold text-lg">₹146.04</p>
            <p className="text-gray-400 line-through text-sm">₹194.72</p>
          </div>
        </div>
      </div>

      {/* Section: Economy */}
      <div className="flex items-center justify-center font-bold text-black mt-4 text-xl">
        Economy
      </div>

      {/* Economy Cards */}
      <div>
        {/* Card 4 */}
        <div
          onClick={() => handleCardClick(4)}
          className={`max-w-md mx-auto border rounded-lg p-4 mt-2 shadow-lg flex items-center 
            ${selectedCard === 4 ? "border-black" : "hover:border-black"} 
            hover:shadow-xl transition-all duration-300 cursor-pointer`}
        >
          <div className="w-16 h-16">
            <Image
              src="/handicap.png"
              alt="Handicap Ride"
              width={200}
              height={200}
              className="object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 ml-4 flex flex-col">
            <h2 className="text-lg font-bold flex items-center">
              Split Care <User fill="text-black" size={15} className="ml-2" /> <span className="text-sm">4</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Handicap-friendly rides</p>
          </div>
          <div className="text-right">
          <p className="text-green-500 font-bold text-sm">25% off</p>
            <p className="text-green-500 font-bold text-lg">₹154.43</p>
            <p className="text-gray-400 line-through text-sm">₹205.91</p>
          </div>
        </div>

        {/* Card 5 */}
        <div
          onClick={() => handleCardClick(5)}
          className={`max-w-md mx-auto border rounded-lg p-4 mt-2 shadow-lg flex items-center 
            ${selectedCard === 5 ? "border-black" : "hover:border-black"} 
            hover:shadow-xl transition-all duration-300 cursor-pointer`}
        >
          <div className="w-16 h-16">
            <Image
              src="/economy1.png"
              alt="Economy Ride"
              width={200}
              height={200}
              className="object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 ml-4 flex flex-col">
            <h2 className="text-lg font-bold flex items-center">
              Split Pet <User fill="text-black" size={15} className="ml-2" /> <span className="text-sm">4</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Ride with your furry friend</p>
          </div>
          <div className="text-right">
          <p className="text-green-500 font-bold text-sm">25% off</p>
            <p className="text-green-500 font-bold text-lg">₹100.50</p>
            <p className="text-gray-400 line-through text-sm">₹200.72</p>
          </div>
        </div>
      </div>

      {/* Section: More */}
      <div className="flex items-center justify-center font-bold text-black mt-4 text-xl">
        More
      </div>
      <div>
        {/* Card 6 */}
        <div
          onClick={() => handleCardClick(6)}
          className={`max-w-md mx-auto border rounded-lg p-4 mt-2 shadow-lg flex items-center 
            ${selectedCard === 6 ? "border-black" : "hover:border-black"} 
            hover:shadow-xl transition-all duration-300 cursor-pointer`}
        >
          <div className="w-16 h-16">
            <Image
              src="/more1.png"
              alt="More Options"
              width={200}
              height={200}
              className="object-contain hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 ml-4 flex flex-col">
            <h2 className="text-lg font-bold flex items-center">
              Split More <User fill="text-black"  size={15} className="ml-2" /> <span className="text-sm">4</span>
            </h2>
            <p className="text-gray-500 text-sm mt-1">Explore other options</p>
          </div>
          <div className="text-right">
          <p className="text-green-500 font-bold text-sm">25% off</p>
            <p className="text-green-500 font-bold text-lg">₹120.50</p>
            <p className="text-gray-400 line-through text-sm">₹300.90</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ride;
