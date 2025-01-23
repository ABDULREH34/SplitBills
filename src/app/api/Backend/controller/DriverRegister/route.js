import { connectToDatabase } from "../../mongodb/db";
import { sendVerificationEmail } from "../../Component/SendVerification/route";
import { DriverDemo } from "../../models/DriverDemo";

export async function POST(req) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { username, email, password, vehicle } = body; 

        const { firstname, lastname } = username;

        
        const { vehicleType, vehicleCapacity, vehiclePlate, vehicleColor } = vehicle;

        
        const verifyCode = Math.floor(100000 + Math.random() * 900000); 

        const verifyExpiry = new Date();
        verifyExpiry.setMinutes(verifyExpiry.getMinutes() + 15);

       
        await sendVerificationEmail(email, verifyCode);

        
        const user = await DriverDemo.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
            verifyCode,
            verifyExpiry,
            VehicleInformation: {
                vehicleType,
                vehicleCapacity,
                vehiclePlate,
                vehicleColor,
            },
        });
  
        const response = new Response(
            JSON.stringify({
                message: "Email has been sent. Please check your inbox.",
            }),
            { status: 201 }
        );

        return response;
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}
