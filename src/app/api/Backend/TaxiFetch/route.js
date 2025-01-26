import Taxi from "../models/taxi";
import { connectToDatabase } from "../mongodb/db";

export async function POST(req) {
    try {
        console.log("Request received"); 
        const body = await req.json(); 
        console.log("Request Body:", body); 

        const { pickup, destination } = body;

        // Validate request body
        if (!pickup || !destination) {
            console.error("Pickup or destination missing"); 
            return new Response(
                JSON.stringify({ message: "Pickup and destination are required" }),
                { status: 400 }
            );
        }

        await connectToDatabase(); 
        console.log("Database connected"); 

        // Fetch data from database
        const data = await Taxi.findOne({});

        // Check if pickup exists in the data
        if (data && data[pickup]) {
            const pickupData = data[pickup]; 
            console.log("Pickup Data:", pickupData); 

 
            if (pickupData.price && pickupData.km) {
                const destinationData = data[destination];
                if (pickupData) {
                    console.log("Destination Data:", destinationData); 
                    return new Response(
                        JSON.stringify({
                            pickup,
                            destination,
                            price: pickupData.price,
                            km: pickupData.km,
                            ...destinationData,
                        }),
                        { status: 200 }
                    );
                }
                return new Response(
                    JSON.stringify({
                        pickup,
                        price: pickupData.price,
                        km: pickupData.km,
                        message: "Destination data not available for flat structure",
                    }),
                    { status: 200 }
                );
            }

            // Handle nested structure: pickup contains nested destinations
            const destinationData = pickupData[destination];
            if (destinationData) {
                console.log("Destination Data:", destinationData); 
                return new Response(
                    JSON.stringify({
                        pickup,
                        destination,
                        price: destinationData.price,
                        km: destinationData.km,
                        ...destinationData,
                    }),
                    { status: 200 }
                );
            }
        }

        // Data not found for given pickup or destination
        console.error("Data not found for the given pickup and destination");
        return new Response(
            JSON.stringify({
                message: "Data not found for the given pickup and destination",
            }),
            { status: 404 }
        );
    } catch (error) {
        console.error("Error:", error.message);
        return new Response(
            JSON.stringify({
                message: "Error fetching data",
                error: error.message,
            }),
            { status: 500 }
        );
    }
}
