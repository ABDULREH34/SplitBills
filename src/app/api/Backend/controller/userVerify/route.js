import { User } from "../../models/User";
import { userDemo } from "../../models/userDemo";
import { connectToDatabase } from "../../mongodb/db";
import { generateToken } from "../generateToken/route";
import { setCookie } from "../setCookie/route";

export async function POST(req) {
    await connectToDatabase();

    try {
        const { verifyCode } = await req.json();

        console.log(verifyCode);
        
        const demoUser = await userDemo.findOne({ verifyCode });

        if (!demoUser) {
            return new Response(JSON.stringify({ message: 'User not found in demo table' }), { status: 404 });
        }

       
        const currentTime = new Date();
        if (demoUser.verifyCode !== verifyCode) {
            return new Response(JSON.stringify({ message: 'Invalid verification code' }), { status: 400 });
        }
        if (currentTime > demoUser.verifyExpiry) {
            return new Response(JSON.stringify({ message: 'Verification code expired' }), { status: 400 });
        }

        const { accessToken, refreshToken } = await generateToken(demoUser._id);
        demoUser.refreshToken = refreshToken;
        await demoUser.save({ validateBeforeSave: false });

        const newUser = new User({
            fullname: demoUser.fullname,
            email: demoUser.email,
            password: demoUser.password,
            refreshToken: demoUser.refreshToken,
        });

        await newUser.save();

        
        await userDemo.deleteOne({ verifyCode });

        const response = new Response(
            JSON.stringify({
                user: {
                    ...newUser.toJSON(),
                    accessToken: accessToken,
                    password: undefined,
                    refreshToken: undefined
                }
            }),
            { status: 200 }
        );
         setCookie(response, accessToken, refreshToken);
         return response
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}
