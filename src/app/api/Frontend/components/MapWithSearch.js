{/*  "use client";
import React, { useState } from "react";
import Script from "next/script";
import axios from "axios";

const MapWithSearch = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [error, setError] = useState("");

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // Fetch location coordinates
  const fetchCoordinates = async (address) => {
    const url = `https://atlas.mapmyindia.com/api/placesearch/json?query=${encodeURIComponent(
      address
    )}&access_token=${apiKey}`;
    console.log("fetching url:",url);
    try {
      const response = await axios.get(url);
      if (response.data.suggestedLocations?.length > 0) {
        const { latitude, longitude } = response.data.suggestedLocations[0];
        return { lat: latitude, lng: longitude };
      }
      throw new Error("Location not found");
    } catch (err) {
      console.error("Error fetching location:", err);
      setError("Unable to fetch location data");
      return null;
    }
  };

  // Search button handler
  const handleSearch = async () => {
    if (!pickup || !drop) {
      setError("Both Pickup and Drop locations are required");
      return;
    }

    setError(""); // Clear errors

    // Pickup and Drop location coordinates
    const pickupCoords = await fetchCoordinates(pickup);
    const dropCoords = await fetchCoordinates(drop);

    if (pickupCoords && dropCoords) {
      initializeMap(pickupCoords, dropCoords); // Render map
    }
  };

  // Initialize Map
  const initializeMap = (pickupCoords, dropCoords) => {
    const map = new window.MapmyIndia.Map("map", {
      center: [pickupCoords.lat, pickupCoords.lng],
      zoom: 12,
    });

    // Add Pickup Marker
    new window.L.marker([pickupCoords.lat, pickupCoords.lng], {
      title: "Pickup",
    }).addTo(map);

    // Add Drop Marker
    new window.L.marker([dropCoords.lat, dropCoords.lng], {
      title: "Drop",
    }).addTo(map);

    // Fit map to show both locations
    const bounds = window.L.latLngBounds([
      [pickupCoords.lat, pickupCoords.lng],
      [dropCoords.lat, dropCoords.lng],
    ]);
    map.fitBounds(bounds);
  };

  return (
    <>
      {/* Include MapMyIndia scripts */}
    {/*
      <Script
        src={`https://apis.mapmyindia.com/advancedmaps/v1/${process.env.NEXT_PUBLIC_MAP_KEY}/map_load?v=1.5`}
        strategy="beforeInteractive"
      />
      <Script
        src={`https://apis.mapmyindia.com/advancedmaps/v1/${process.env.NEXT_PUBLIC_MAP_KEY}/map_css?v=1.5`}
        strategy="beforeInteractive"
      />

      <div>
        <div>
          <input
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter Pickup Location"
          />
          <input
            type="text"
            value={drop}
            onChange={(e) => setDrop(e.target.value)}
            placeholder="Enter Drop Location"
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Map Container */}
        {/*
        <div id="map" style={{ height: "400px", width: "100%", marginTop: "20px" }}></div>
      </div>
    </>
  );
};

export default MapWithSearch;
*/}