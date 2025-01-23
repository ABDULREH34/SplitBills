import mongoose from "mongoose";

const DriverDemoSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long.'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long.'],
        },
    },
    email: {
        type: String,
        required: true,
       
        minlength: [5, 'Email must be at least 5 characters long.'],
        match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email regex validation
    },
    password: {
        type: String,
        required: true,
    },
    verifyCode: {
        type: String,
        required: true,
    },
    verifyExpiry: {
        type: Date,
        required: true,
    },
    VehicleInformation:{
        vehicleColor: {
            type: String,
            required: true,
        },
        vehiclePlate: {
            type: String,
            required: true,
        },
        vehicleCapacity: {
            type: Number,
            required: true,
        },
        vehicleType: {
            type: String,
            required: true,
        },  
    },
});

export const DriverDemo = mongoose.models.DriverDemo || mongoose.model("DriverDemo", DriverDemoSchema);
