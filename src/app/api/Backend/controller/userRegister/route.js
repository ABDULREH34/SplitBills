// File: app/api/register/route.js
import { connectToDatabase } from '@app/api/Backend/mongodb/db';
import { userModel } from '@app/api/Backend/models/user';


export async function POST(req) {
    await connectToDatabase();
    try {

        const body = await req.json(); 
        
        const { fullname, email, password } = body;
        console.log(fullname);
        
        
        const isUserAlready = await userModel.findOne({ email });
        if (isUserAlready) {
            return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
        }

        const user = await userModel.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password,
        });


        const token = user.generateAuthToken();
        console.log(token);
        
        // Send response
        return new Response(
            JSON.stringify({ token, user: { ...user.toJSON(), password: undefined } }),
            { status: 201 }
        );
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), { status: 500 });
    }
}
