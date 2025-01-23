import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserDemoSchema = new mongoose.Schema({
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
        match: [/.+@.+\..+/, 'Please enter a valid email address'], 
    },
    password: {
        type: String,
        required: true,
    },
    verifyCode: {
        type: String,
        required: true, // Store the verification code
    },
    verifyExpiry: {
        type: Date,
        required: true, // Store the expiry time for verification
    }
});

export const userDemo = mongoose.models.userDemo || mongoose.model("userDemo", UserDemoSchema);
