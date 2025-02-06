import { DriverVerify } from "../../models/Driververify";
import { connectToDatabase } from "../../mongodb/db";
export async function POST (req ) {
  await connectToDatabase();

  const { verifyCode } = await req.json();

  try {
    console.log("Verify",verifyCode);
    const existingVerification = await DriverVerify.findOne({ VerifyCode: verifyCode });

    if (existingVerification) {
      return new Response(JSON.stringify({ message: "Verification Code is Right" }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: "Verification Code is Wrong" }), { status: 400 });    
  } catch (error) {
    console.error('Internal Server Error:', error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};