import { User } from "../../models/User";
import { connectToDatabase } from "../../mongodb/db";
import { generateToken } from "../generateToken/route";
import { setCookie } from "../setCookie/route";

export async function POST(req) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { fullname, email, password } = body;

        // Check if the user already exists
        const isUserAlready = await User.findOne({ email });
        if (isUserAlready) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
        }

        // Create new user
        const user = await User.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password,
        });
        

        // Generate tokens
        const { accessToken, refreshToken } = await generateToken(user._id);
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        

        // Create response object without password and refreshToken
        const response = new Response(
            JSON.stringify({ 
                user: { 
                    ...user.toJSON(), 
                    password: undefined,  // Exclude password
                    refreshToken: undefined // Exclude refreshToken
                } 
            }),
            { status: 201 }
        );

        // Apply cookies using setCookie
        setCookie(response, accessToken, refreshToken);


        return response;
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}
