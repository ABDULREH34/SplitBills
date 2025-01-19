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
        console.log(email);
        
    console.log(password);
    
        
        if (!email || !password) {
            return new Response(
                JSON.stringify({ message: "Please fill all the details" }),
                { status: 400 }
            );
        }

        
        const user = await User.findOne({ email });
        if (!user.password) {
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

  
        const { accessToken, refreshToken } = await generateToken(user._id);
       
        
        const response = new Response(
            JSON.stringify({ message: "Login Successfully" }),
            { status: 200 }
        );

        setCookie(response, accessToken, refreshToken);

        return response;
    } catch (error) {
        return new Response(
            JSON.stringify({ message: error.message }),
            { status: 500 }
        );
    }
}
