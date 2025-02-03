import mongoose from 'mongoose';

const rideRequestSchema = new mongoose.Schema({
  pickupLocation: {
    type: String,
    required: true,
  },
  destinationLocation: {
    type: String,
    required: true,
  },
  totalDistance: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const RideRequest = mongoose.models.RideRequest || mongoose.model('RideRequest', rideRequestSchema);
export default RideRequest;
