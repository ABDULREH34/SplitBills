import jwt from "jsonwebtoken";
import { User } from "../../models/User";
import { connectToDatabase } from "../../mongodb/db";

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Extract the token from cookies
    const token = req.cookies?.accessToken;

    if (!token) {
      return new Response(
        JSON.stringify({ message: "Token not provided" }),
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    // Decode the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.AccessToken);
    } catch (err) {
      console.error("Authentication failed:", err.message);
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    // Extract the new password from the request body
    const { password } = await req.json();
    if (!password) {
      return new Response(
        JSON.stringify({ message: "Please enter a password" }),
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    // Update the user's password
    const updatedUser = await User.findByIdAndUpdate(
      decoded._id, // Use the user ID from the decoded token
      { $set: { password: password } }, // Set the new password
      { new: true }
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ message: "Password not updated" }),
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Password updated successfully" }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Credentials": "true",
        },
      }
    );
  }
}
