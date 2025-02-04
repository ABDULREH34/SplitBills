import bcrypt from 'bcrypt';
import { connectToDatabase } from '../../mongodb/db';
import { User } from '../../models/User';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Extract the token from cookies
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.accessToken;
    console.log(token);
    
    if (!token) {
      return new Response(
        JSON.stringify({ message: "Token not provided" }),
        { status: 400 }
      );
    }

    let decoded;
    try {
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

    
    const updatedUser = await User.findByIdAndUpdate(
      decoded._id,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
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
