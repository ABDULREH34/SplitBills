import { NextResponse } from 'next/server'; 
import { saveRideRequest } from '../Ridecontroller2/route';
export async function POST(req) {
  try {
    const body = await req.json(); 

    // Call the database function and get the response
    const response = await saveRideRequest(body);

    
    const status = response?.status || 200;  
    
    // Return a response using NextResponse
    return NextResponse.json(response, { 
      status: status, 
    });

  } catch (error) {
    console.error("Error in handler:", error);
    // Return a 500 Internal Server Error with specific error message
    return NextResponse.json(
      { message: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}
