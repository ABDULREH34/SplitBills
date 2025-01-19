 
import Contact from "@app/api/Backend/models/contact"; // Import the Contact model
import { connectToDatabase } from "../../mongodb/db";

export async function POST(req) {
  try {
   
    await connectToDatabase();

    
    const { fullname, email, message } = await req.json();

    
    if (!email ) {
      return new Response(
        JSON.stringify({ error: "email are required." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    if(!fullname){
      return new Response(
        JSON.stringify({ error: "Fullname,  are required." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    if(!message){
      return new Response(
        JSON.stringify({ error: " message are required." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const contact = await Contact.create({
      fullname,
      email,
      message,
    });

    // Return a success response
    return new Response(
      JSON.stringify({ message: "Contact synced successfully", contact }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error syncing contact:", error);
    // Return an internal server error response
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
