import { userDemo } from "../../models/userDemo";
import { connectToDatabase } from "../../mongodb/db";
import { sendVerificationEmail } from "../../Component/SendVerification/route";

export async function POST(req) {
    await connectToDatabase();

    try {
        const body = await req.json();
        const { username, email, password } = body;

        
        const { firstname, lastname } = username;

        
        const verifyCode = Math.floor(100000 + Math.random() * 900000); 

        
        const verifyExpiry = new Date();
        verifyExpiry.setMinutes(verifyExpiry.getMinutes() + 15);
        await sendVerificationEmail(email, verifyCode);
        const user = await userDemo.create({
            fullname: {
                firstname,
                lastname,
            },
            email,
            password,
            verifyCode,
            verifyExpiry
        });
  
        const response = new Response(
            JSON.stringify({
                
                message:"Email Has Sent Please Check"
            }),
            { status: 201 }
        );

        return response;
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}
