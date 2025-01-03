"use client";

import React, { useState } from "react";
import Image from "next/image";

import { User } from "lucide-react";
import { gsap } from "gsap";
import Header from "../components/Header";
import ConfirmRidePanel from "../components/Home1/ConfirmRidePanel";
import LookingForDriverPanel from "../components/Home1/LookingForDriverPanel";

// Data for all sections
const ridesData = [
  {
    section: "Recommended",
    rides: [
      {
        id: 1,
        name: "Premier",
        seats: 4,
        description: "Comfortable sedans, top-quality drivers",
        discountPrice: 176.98,
        originalPrice: 235.98,
        image: "/car1.jpg",
      },
      {
        id: 2,
        name: "SplitXL",
        seats: 6,
        description: "Comfortable SUVs",
        discountPrice: 273.64,
        originalPrice: 348.64,
        image: "/car2.webp",
      },
      {
        id: 3,
        name: "Split Go",
        seats: 4,
        description: "Affordable compact rides",
        discountPrice: 146.04,
        originalPrice: 194.72,
        image: "/car3.jpg",
      },
    ],
  },
  {
    section: "Economy",
    rides: [
      {
        id: 4,
        name: "Split Care",
        seats: 4,
        description: "Handicap-friendly rides",
        discountPrice: 154.43,
        originalPrice: 205.91,
        image: "/handicap.png",
      },
      {
        id: 5,
        name: "Split Pet",
        seats: 4,
        description: "Ride with your furry friend",
        discountPrice: 100.5,
        originalPrice: 200.72,
        image: "/economy1.png",
      },
    ],
  },
  {
    section: "More",
    rides: [
      {
        id: 6,
        name: "Split More",
        seats: 4,
        description: "Explore other options",
        discountPrice: 120.5,
        originalPrice: 300.9,
        image: "/more1.png",
      },
    ],
  },
];

const Ride = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [lookingForDriver, setLookingForDriver] = useState(false);

  const handleCardClick = (ride) => {
    if (selectedCard === ride.id) {
      // If the same card is clicked, close the panel
      handleClosePanel();
    } else {
      // Open the panel for the new ride
      setSelectedCard(ride.id);
      setSelectedRide(ride);
      setConfirmRidePanel(true);

      // Animate panel appearance
      gsap.to(".confirm-ride-panel", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }
  };

  const handleClosePanel = () => {
    // Animate panel hiding
    gsap.to(".confirm-ride-panel", {
      y: "100%",
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        setConfirmRidePanel(false);
        setSelectedCard(null); // Reset the selected card
      },
    });
  };

  const handleLookingForDriver = () => {
    // This will trigger the "Looking for driver" panel to appear
    handleClosePanel();
    setLookingForDriver(true);

    // Animate "Looking for driver" panel appearance
    gsap.to(".looking-for-driver-panel", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <>
      {/* Header */}
      <div
        style={{
          backgroundColor: "#ffffff",
          zIndex: 1000,
          position: "sticky",
        }}
      >
        <Header />
      </div>

      {/* Background Video */}
      <div className="video-container">
        <video autoPlay muted loop className="background-video">
          <source src="/Animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Section */}
      <div className="relative z-10">
        {/* Page Title */}
        <div className="flex items-center justify-center font-bold text-black mt-2 text-3xl">
          Choose a ride
        </div>

        {ridesData.map((sectionData, index) => (
          <div key={index} className="mt-4">
            {/* Section Title */}
            <div className="flex items-center justify-center font-bold text-black text-xl">
              {sectionData.section}
            </div>

            {/* Cards */}
            <div>
              {sectionData.rides.map((ride) => (
                <div
                  key={ride.id}
                  onClick={() => handleCardClick(ride)}
                  className={`max-w-md mx-auto border rounded-lg p-4 mt-2 shadow-lg flex items-center 
                  ${selectedCard === ride.id ? "border-black" : "hover:border-black"} 
                  hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  <div className="w-16 h-16">
                    <Image
                      src={ride.image}
                      alt={ride.name}
                      width={200}
                      height={200}
                      className="object-contain hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 ml-4 flex flex-col">
                    <h2 className="text-lg font-bold flex items-center">
                      {ride.name}{" "}
                      <User fill="text-black" size={15} className="ml-2" />{" "}
                      <span className="text-sm">{ride.seats}</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">{ride.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-500 font-bold text-sm">25% off</p>
                    <p className="text-green-500 font-bold text-lg">
                      ₹{ride.discountPrice}
                    </p>
                    <p className="text-gray-400 line-through text-sm">
                      ₹{ride.originalPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Ride Panel */}
      {confirmRidePanel && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Modal */}
          <div
            className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-6 z-50 transform transition-transform 
            ${confirmRidePanel ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
          >
            <ConfirmRidePanel ride={selectedRide} onClose={handleClosePanel} onConfirm={handleLookingForDriver} />

          </div>
        </>
      )}

      {lookingForDriver && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg p-6 z-50 transform transition-transform 
            ${lookingForDriver ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
            <LookingForDriverPanel ride={selectedRide} onClose={() => setLookingForDriver(false)} />
          </div>
        </>
      )}

      {/* Styles */}
      <style jsx>{`
        .video-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -10;
        }

        .background-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .relative {
          position: relative;
        }

        .confirm-ride-panel {
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.5s ease, opacity 0.5s ease;
        }

        .looking-for-driver-panel {
          transform: translateY(100%);
          opacity: 0;
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
      `}</style>
    </>
  );
};

export default Ride;
