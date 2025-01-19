import { Driver } from "../../models/Driver";
import { connectToDatabase } from "../../mongodb/db";
import { generateToken } from "../generateToken/route";
import { setCookie } from "../setCookie/route";

export async function POST(req) {
    await connectToDatabase();

    try {
        // Parse request body
        const body = await req.json();
        const { email, password } = body;
        console.log(email);
        console.log(password);

        // Check if both email and password are provided
        if (!email || !password) {
            return new Response(
                JSON.stringify({ message: "Please fill all the details" }),
                { status: 400 }
            );
        }

        // Find the driver by email
        const driver = await Driver.findOne({ email });
        if (!driver) {
            return new Response(
                JSON.stringify({ message: "Email Not Found" }),
                { status: 400 }
            );
        }

        // Check if the password matches
        const isMatch = await driver.comparePassword(password); 
        if (!isMatch) {
            return new Response(
                JSON.stringify({ message: "Invalid Credentials" }),
                { status: 400 }
            );
        }

        // Generate tokens
        const { accessToken, refreshToken } = await generateToken(driver._id);

        // Create response object
        const response = new Response(
            JSON.stringify({ message: "Login Successfully" }),
            { status: 200 }
        );

        // Apply cookies using setCookie
        setCookie(response, accessToken, refreshToken);

        return response;
    } catch (error) {
        return new Response(
            JSON.stringify({ message: error.message }),
            { status: 500 }
        );
    }
}
