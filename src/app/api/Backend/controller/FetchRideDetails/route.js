import { NextResponse } from "next/server";
import { connectToDatabase } from "../../mongodb/db";
import RideRequest from "../../models/RideRequest";

export async function GET(req) {
  try {
    await connectToDatabase();

    const rides = await RideRequest.find({}).sort({ date: -1 });

    return NextResponse.json({ success: true, data: rides });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
