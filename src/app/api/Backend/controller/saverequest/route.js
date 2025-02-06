import { NextResponse } from "next/server"; // ✅ Import this
import RideRequest from "../../models/RideRequest";
import { connectToDatabase } from "../../mongodb/db";
import { notifyDrivers } from "../Socket/route"; // Import WebSocket function

export async function POST(req) {
  try {
    const body = await req.json();
    const { pickupLocation, destinationLocation, totalDistance, price } = body;

    if (!pickupLocation || !destinationLocation || !totalDistance || !price) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 }); // ✅ Fix syntax
    }

    await connectToDatabase();

    const newRide = new RideRequest({
      pickupLocation,
      destinationLocation,
      totalDistance,
      price,
    });

    await newRide.save();

    // Notify drivers via WebSocket
    notifyDrivers(newRide);

    return NextResponse.json({ message: "Ride saved", ride: newRide }, { status: 201 }); // ✅ Return JSON with the ride object
  } catch (error) {
    console.error("Error saving ride request:", error);
    return NextResponse.json({ message: "Failed to save ride request", error: error.message }, { status: 500 }); // ✅ Send error details
  }
}
