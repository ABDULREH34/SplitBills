import { getAuth } from "@clerk/nextjs/server";  
import connectDB from "app/mongodb/db";
import Login from "app/models/login";

// This function will handle POST requests to sync user data
export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Ensure Clerk authentication is included in request
    const { userId, sessionId } = getAuth(req); // Getting userId and sessionId from Clerk auth
    console.log("Authenticated UserId:", userId);

    // If userId is not available, return Unauthorized error
    if (!userId) {
      return new Response(JSON.stringify({ message: "User not authenticated" }), { status: 401 });
    }

    // Parse the request body to extract email and password
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the user already exists in the database
    let user = await Login.findOne({ clerkUserId: userId });
    
    if (!user) {
      // Create a new user if not found
      user = await Login.create({ clerkUserId: userId, email, password });

      // Log success message to console if user is created
      console.log("User stored successfully:", user);
      return new Response(
        JSON.stringify({ message: "User synced successfully", user }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      // Log failure message if user already exists
      console.log("User already exists in the database:", user);
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }
    
  } catch (error) {
    console.error("Error syncing user:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
