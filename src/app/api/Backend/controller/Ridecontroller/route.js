import Rideservices from "../../Rideservices/route";
import { validationResult } from 'express-validator';
import mapService from '@/services/maps.service';
import { sendMessageToSocketId } from '@/socket';
import rideModel from '@/models/ride.model';


export async function createRide(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return NextResponse.json({ errors: errors.array() }, { status: 400 });
    }
    const { pickup, destination, vehicleType } = await req.json();

    try {
        const ride = await Rideservices.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.ltd,
            pickupCoordinates.lng,
            2
        );

        ride.otp = '';

        const rideWithUser = await rideModel
            .findOne({ _id: ride._id })
            .populate('user');

        captainsInRadius.forEach(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser,
            });
        });

        return NextResponse.json(ride, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function getFare(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return NextResponse.json({ errors: errors.array() }, { status: 400 });
    }

    const { pickup, destination } = Object.fromEntries(new URL(req.url).searchParams);

    try {
        const fare = await rideService.getFare(pickup, destination);
        return NextResponse.json(fare, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
export async function confirmRide(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return NextResponse.json({ errors: errors.array() }, { status: 400 });
    }

    const { rideId } = await req.json();

    try {
        const ride = await rideService.confirmRide({
            rideId,
            captain: req.captain
        });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride,
        });

        return NextResponse.json(ride, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function startRide(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return NextResponse.json({ errors: errors.array() }, { status: 400 });
    }

    const { rideId, otp } = Object.fromEntries(new URL(req.url).searchParams);

    try {
        const ride = await rideService.startRide({
            rideId,
            otp,
            captain: req.captain
        });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride,
        });

        return NextResponse.json(ride, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}

export async function endRide(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return NextResponse.json({ errors: errors.array() }, { status: 400 });
    }

    const { rideId } = await req.json();

    try {
        const ride = await rideService.endRide({
            rideId,
            captain: req.captain
        });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride,
        });

        return NextResponse.json(ride, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}