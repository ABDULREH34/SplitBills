import { Driver } from "../../models/Driver";
import { connectToDatabase } from "../../mongodb/db";
import { generateToken } from "../generateToken/route";
import { setCookie } from "../setCookie/route";

export async function POST(req) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { fullname, email, password, VehicleInformation } = body;

        // Check if the driver already exists
        const isUserAlready = await Driver.findOne({ email });
        if (isUserAlready) {
            return new Response(JSON.stringify({ message: 'Driver already exists' }), { status: 400 });
        }

        // Create new driver
        const driver = await Driver.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password,
            VehicleInformation: {
                vehicleColor: VehicleInformation.vehicleColor,
                vehiclePlate: VehicleInformation.vehiclePlate,
                vehicleCapacity: VehicleInformation.vehicleCapacity,
                vehicleType: VehicleInformation.vehicleType,
            },
        });

        // Generate tokens
        const { accessToken, refreshToken } = await generateToken(driver._id);
        driver.refreshToken = refreshToken;
        await driver.save({ validateBeforeSave: false });

        // Create response object without password and refreshToken
        const response = new Response(
            JSON.stringify({
                driver: {
                    ...driver.toJSON(),
                    password: undefined,  
                    refreshToken: undefined, 
                },
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
