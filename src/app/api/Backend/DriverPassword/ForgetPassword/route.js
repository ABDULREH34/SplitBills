import { sendVerificationEmail } from "../../Component/SendVerification/route";
import { Driver } from "../../models/Driver";
import { Verify } from "../../models/Verify";
import { connectToDatabase } from "../../mongodb/db";
export async function POST (req ) {
  await connectToDatabase();
        
        const { email } = await req.json();
  try {
    const exitEmail = await Driver.findOne({ email })
    console.log(exitEmail);
    
    if (!exitEmail) {
        return new Response(
            JSON.stringify({ message: "Email Doesn't Exist" }),
            { status: 404 }
        );
    }
    const verifyTokens = Math.floor(100000 + Math.random() * 900000)

    const verifyCode = await Verify.create({
      Email: email,
      VerifyCode: verifyTokens
    })

    await sendVerificationEmail(email, verifyTokens)
    return new Response(
        JSON.stringify({ message: "Email Sent Successfully" }),
        { status: 200 }
    );
  } catch (error) {
    console.log("Internal Server Error", error.message);
    return new Response(
        JSON.stringify({ message: "Internal Server Error" }),
        { status: 500 }
    );
  }
}