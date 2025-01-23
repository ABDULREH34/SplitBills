import { NextResponse } from "next/server";
import {body,query} from 'express-validator';
import rideController from "@app/api/Backend/controllers/rideController";
import { authMiddleware} from "../middleware/route";

export const POST = {
    '/create':[
        authMiddleware.authUser,
        body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup address'),
        body('destination').isString().isLength({min:3}).withMessage('Invalid Destination address'),
        body('vechileType').isString(),isIn(['car']).withMessage('Invalid Vechile Type'),
        rideController.createRide,
    ],
    '/confirm': [
        authMiddleware.authUser,
        body('rideId').isMongoId().withMessage('Invalid ride Id'),
        rideController.confirmRide,
    ],
    '/end-ride': [
        authMiddleware.authUser,
        body('rideId').isMongoId().withMessage('Invalid ride Id'),
        rideController.endRide
    ],
};

export const GET = {
    'get-fare' : [
        authMiddleware.authUser,
        query('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup address'),
        query('destination').isString().isLength({min:3}).withMessage('Invalid Destination address'),
        rideController.getFare,
    ],
    'start-ride' :[

        authMiddleware.authUser,
        query('rideId').isMongoId().withMessage('Invalid ride Id'),
        query('otp').isString().isLength({min:6 , max:6}).withMessage('Invalid OTP'),
        rideController.startRide
    ]
};