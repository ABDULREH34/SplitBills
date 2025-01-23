import { Driver } from "../../models/Driver";
import { DriverDemo } from "../../models/DriverDemo";
import { connectToDatabase } from "../../mongodb/db";
import { generateToken } from "../generateToken/route";
import { setCookie } from "../setCookie/route";

export async function POST(req) {
    await connectToDatabase();

    try {
        const { verifyCode } = await req.json();
       
        
        const demoDriver = await DriverDemo.findOne({ verifyCode });
        console.log("Info",demoDriver);
        
        if (!demoDriver) {
            return new Response(JSON.stringify({ message: 'User not found in demo table' }), { status: 404 });
        }
        
        

       
        const currentTime = new Date();
        if (demoDriver.verifyCode !== verifyCode) {
            return new Response(JSON.stringify({ message: 'Invalid verification code' }), { status: 400 });
        }
        if (currentTime > demoDriver.verifyExpiry) {
            return new Response(JSON.stringify({ message: 'Verification code expired' }), { status: 400 });
        }

        const { accessToken, refreshToken } = await generateToken(demoDriver._id);
        demoDriver.refreshToken = refreshToken;
        await demoDriver.save({ validateBeforeSave: false });
        
        
        const newDriver = new Driver({
            fullname: demoDriver.fullname,
            email: demoDriver.email,
            password: demoDriver.password,
            VehicleInformation: demoDriver.VehicleInformation
        });

        await newDriver.save();

        
        await DriverDemo.deleteOne({ verifyCode });

        const response = new Response(
            JSON.stringify({
                Driver: {
                    ...newDriver.toJSON(),
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
