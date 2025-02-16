import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
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
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long.'],
        match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email regex validation
    },
    password: {
        type: String,
        required: true,
       
    },
    // Uncomment if you need a socket ID
    // socketId: {
    //     type: String,
    // },
    refreshToken:{
        type: String,
        
    }
});

// Add an index for faster queries and unique email enforcement


UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        console.log("Before hashing:", this.password);
        this.password = await bcrypt.hash(this.password, 10);
        console.log("After hashing:", this.password);
        next();
    } catch (error) {
        console.error("Error hashing password:", error);
        next(error);
    }
});

// Generate JWT token
UserSchema.methods.generateAccessToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.AccessToken,
        { expiresIn: process.env.AccessTokenExpiry } 
    );
    return token;
};

UserSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.RefreshToken,
        { expiresIn: process.env.RefreshTokenExpiry  } 
    );
    return token;
};

// Compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
    if (!candidatePassword) {
        throw new Error("Password argument is required");
    }
    if (!this.password) {
        throw new Error("User password not found");
    }
    return await bcrypt.compare(candidatePassword, this.password);
};




// Export the model
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
// export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
