import mongoose from "mongoose";

const VerifySchema = new mongoose.Schema({
    Email: { type: String, required: true },
    VerifyCode: { type: Number, required: true },
});


export const DriverVerify = mongoose.models.DriverVerify || mongoose.model("DriverVerify", VerifySchema);
