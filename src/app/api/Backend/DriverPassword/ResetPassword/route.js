import bcrypt from 'bcrypt';
import { connectToDatabase } from '../../mongodb/db';
import jwt from 'jsonwebtoken';
import { Driver } from '../../models/Driver';

export async function POST(req) {
  try {
    
    await connectToDatabase();

    
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.accessToken;

    if (!token) {
      return new Response(
        JSON.stringify({ message: "Token not provided" }),
        { status: 400 }
      );
    }

    let decoded;
    try {
      console.log("Received Token:", token);
      decoded = jwt.verify(token, process.env.AccessToken);
    } catch (err) {
      console.error("Authentication failed:", err.message);
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 401 }
      );
    }

    
    const { password } = await req.json();
    if (!password) {
      return new Response(
        JSON.stringify({ message: "Please enter a password" }),
        { status: 400 }
      );
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const updatedDriver = await Driver.findByIdAndUpdate(
      decoded._id,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedDriver) {
      return new Response(
        JSON.stringify({ message: "Password not updated" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Password updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
