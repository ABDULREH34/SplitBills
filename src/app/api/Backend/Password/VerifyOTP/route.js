import { Verify } from "../../models/Verify";
import { connectToDatabase } from "../../mongodb/db";
export async function POST (req ) {
  await connectToDatabase();

  const { verifyOtp } = await req.json();

  try {
    console.log(verifyOtp);
    const existingVerification = await Verify.findOne({ VerifyCode: verifyOtp });

    if (existingVerification && existingVerification.VerifyCode) {
      return new Response(JSON.stringify({ message: "Verification Code is Right" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Verification Code is Wrong" }), { status: 400 });    
  } catch (error) {
    console.error('Internal Server Error:', error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};