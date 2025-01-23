import Ride from "../models/Ride";
import mapService from "../services/mapService";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function getFare(pickup, destination) {
    if(!pickup || !destination){
        throw new Error('Pickup and destination are required');
    }

    const distance = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        car:50,
    };

    const perKmRate = {
        car:15,
    };

    const perMinuteRate = {
        car :3,
    };

    const fare = {
        car:Math.round(
            baseFare.car +(distanceTime.distance.value / 1000) * perKmRate.car + (distanceTime.duration.value /60) * perMinuteRate.car
        ),
    };
    return fare;
}

function getOTP(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString()
    return otp
}

export async function createRide({ user, pickup, destination, vehicleType }) {
    if (!user || !pickup || !destination || !vehicleType) {
      throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    const ride = await rideModel.create({
      user,
      pickup,
      destination,
      otp: getOtp(6),
      fare: fare[vehicleType],
    });
  
    return ride;
  }

  export async function confirmRide({ rideId, captain }) {
    if (!rideId) {
      throw new Error('Ride id is required');
    }
  
    await rideModel.findOneAndUpdate(
      { _id: rideId },
      {
        status: 'accepted',
        captain: captain._id,
      }
    );
  
    const ride = await rideModel
      .findOne({ _id: rideId })
      .populate('user')
      .populate('captain')
      .select('+otp');
  
    if (!ride) {
      throw new Error('Ride not found');
    }
  
    return ride;
  }
  
  export async function startRide({ rideId, otp, captain }) {
    if (!rideId || !otp) {
      throw new Error('Ride id and OTP are required');
    }
  
    const ride = await rideModel
      .findOne({ _id: rideId })
      .populate('user')
      .populate('captain')
      .select('+otp');
  
    if (!ride) {
      throw new Error('Ride not found');
    }
  
    if (ride.status !== 'accepted') {
      throw new Error('Ride not accepted');
    }
  
    if (ride.otp !== otp) {
      throw new Error('Invalid OTP');
    }
  
    await rideModel.findOneAndUpdate(
      { _id: rideId },
      {
        status: 'ongoing',
      }
    );
  
    return ride;
  }
  
  export async function endRide({ rideId, captain }) {
    if (!rideId) {
      throw new Error('Ride id is required');
    }
  
    const ride = await rideModel
      .findOne({
        _id: rideId,
        captain: captain._id,
      })
      .populate('user')
      .populate('captain')
      .select('+otp');
  
    if (!ride) {
      throw new Error('Ride not found');
    }
  
    if (ride.status !== 'ongoing') {
      throw new Error('Ride not ongoing');
    }
  
    await rideModel.findOneAndUpdate(
      { _id: rideId },
      {
        status: 'completed',
      }
    );
  
    return ride;
  }