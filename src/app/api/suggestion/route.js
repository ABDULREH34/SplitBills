import { NextResponse } from "next/server";
import axios from "axios";

const MAPMYINDIA_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function POST(req) {
  try {
    // Parse request body
    const { pickup, drop } = await req.json();
    console.log("Pickup Location:", pickup);
    console.log("Drop Location:", drop);

    // Construct URLs for geocoding API
    const geocodePickupUrl = `https://apis.mapmyindia.com/advancedmaps/v1/${MAPMYINDIA_API_KEY}/geocode?address=${encodeURIComponent(
      pickup
    )}`;
    const geocodeDropUrl = `https://apis.mapmyindia.com/advancedmaps/v1/${MAPMYINDIA_API_KEY}/geocode?address=${encodeURIComponent(
      drop
    )}`;
    console.log("Geocode URLs:", { geocodePickupUrl, geocodeDropUrl });

    let pickupResponse, dropResponse;

    // Fetch geocode data
    try {
      [pickupResponse, dropResponse] = await Promise.all([
        axios.get(geocodePickupUrl),
        axios.get(geocodeDropUrl),
      ]);
      console.log("Pickup Response Data:", pickupResponse.data);
      console.log("Drop Response Data:", dropResponse.data);
    } catch (error) {
      console.error("Geocode API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch geocode data");
    }

    // Extract coordinates
    const pickupCoords =
      pickupResponse.data.copResults && pickupResponse.data.copResults[0];
    const dropCoords =
      dropResponse.data.copResults && dropResponse.data.copResults[0];

    if (!pickupCoords || !dropCoords) {
      throw new Error("Invalid pickup or drop location");
    }

    console.log("Pickup Coordinates:", pickupCoords);
    console.log("Drop Coordinates:", dropCoords);

    // Construct URL for route API
    const routeUrl = `https://apis.mapmyindia.com/advancedmaps/v1/${MAPMYINDIA_API_KEY}/route_adv/driving/${pickupCoords.latitude},${pickupCoords.longitude};${dropCoords.latitude},${dropCoords.longitude}`;
    console.log("Route URL:", routeUrl);

    let routeResponse;
    try {
      routeResponse = await axios.get(routeUrl);
      console.log("Route Response Data:", routeResponse.data);
    } catch (error) {
      console.error("Route API Error:", error.response?.data || error.message);
      throw new Error("Failed to calculate route");
    }

    // Validate route response
    if (routeResponse.data.status !== "success") {
      throw new Error("Route calculation failed");
    }

    const { distance } = routeResponse.data.results.trips[0]; // Distance in meters

    // Car selection based on distance
    const cars = [
      { name: "Hatchback", ratePerKm: 8, maxDistance: 15000 },
      { name: "Sedan", ratePerKm: 10, maxDistance: 25000 },
      { name: "SUV", ratePerKm: 15, maxDistance: Infinity },
    ];

    const selectedCar = cars.find((car) => distance <= car.maxDistance);

    if (!selectedCar) {
      throw new Error("No car available for this distance");
    }

    const totalCost = (distance / 1000) * selectedCar.ratePerKm;

    // Return success response
    return NextResponse.json({
      distance: (distance / 1000).toFixed(2) + " km",
      selectedCar: selectedCar.name,
      totalCost: totalCost.toFixed(2),
    });
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
