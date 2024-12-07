import mongoose from "mongoose";
import Contact from "app/models/contact";
import connectDB from "app/mongodb/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { fullname, email, message } = await req.json();

    try {
        await connectDB();
        await Contact.create({ fullname, email, message });

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 } 
        );
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            const errorList = Object.values(error.errors).map(err => err.message); 

            return NextResponse.json(
                { msg: errorList }, 
                { status: 400 } 
            );
        } else {
            return NextResponse.json(
                { msg: ["An unexpected error occurred"], error: error.message }, 
                { status: 500 } 
            );
        }
    }
}
