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
        select: false, 
    },
    // Uncomment if you need a socket ID
    // socketId: {
    //     type: String,
    // },
});

// Add an index for faster queries and unique email enforcement
UserSchema.index({ email: 1 }, { unique: true });

// Generate JWT token
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION || '24h' } 
    );
    return token;
};

// Compare passwords
UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password,10);
    next();
});

// Export the model
export const userModel = mongoose.models.User || mongoose.model("User", UserSchema);
// export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
