import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const Login = mongoose.models.Login || mongoose.model("Login", loginSchema);

export default Login;
