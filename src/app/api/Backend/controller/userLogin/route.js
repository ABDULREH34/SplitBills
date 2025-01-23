import { User } from "../../models/User";
import { connectToDatabase } from "../../mongodb/db";
import { generateToken } from "../generateToken/route";
import { setCookie } from "../setCookie/route";

export async function POST(req) {
    await connectToDatabase();

    try {
        // Parse request body
        const body = await req.json();
        const { email, password } = body;

        // Validate input
        if (!email || !password) {
            return new Response(
                JSON.stringify({ message: "Please fill all the details" }),
                { status: 400 }
            );
        }

        // Find user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return new Response(
                JSON.stringify({ message: "Email Not Found" }),
                { status: 400 }
            );
        }

        // Check if the password matches
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return new Response(
                JSON.stringify({ message: "Invalid Credentials" }),
                { status: 400 }
            );
        }

        // Generate tokens
        const { accessToken, refreshToken } = await generateToken(user._id);

        console.log("Access Token:", accessToken);

        // Set cookies
        const response = new Response(
            JSON.stringify({
                message: "Login successful",
                accessToken: accessToken,
            }),
            { status: 200 }
        );

        setCookie(response, accessToken, refreshToken);

        return response;
    } catch (error) {
        console.error("Error during login:", error.message);
        return new Response(
            JSON.stringify({ message: "An error occurred during login" }),
            { status: 500 }
        );
    }
}
