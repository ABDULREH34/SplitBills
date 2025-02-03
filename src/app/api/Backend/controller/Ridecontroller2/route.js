import RideRequest from '../../models/RideRequest';
import { connectToDatabase } from '../../mongodb/db';

export const saveRideRequest = async (body) => { 
    const { pickupLocation, destinationLocation, totalDistance, price } = body;
  
    console.log('Received data:', body); // Check what is being passed
  
    if (!pickupLocation || !destinationLocation || !totalDistance || !price) {
      return { message: "Missing required fields", status: 400 };
    }
  
    try {
      await connectToDatabase(); 
  
      console.log('Data before saving:', { pickupLocation, destinationLocation, totalDistance, price });
  
      const newRideRequest = new RideRequest({
        pickupLocation,
        destinationLocation,
        totalDistance,
        price
      });
  
      console.log('RideRequest to save:', newRideRequest);
  
      await newRideRequest.save();
      return { message: "Ride saved", status: 201 };
    } catch (error) {
      if (error.errors) {
        console.error('Validation Errors:', error.errors); 
      } else {
        console.error('Error saving ride:', error);
      }
      return { message: "Failed to save ride request", status: 500 };
    }
};
