import { jwt } from "jsonwebtoken";

export const authMiddleware = (req) => {
    try {
        const token = req.cookies?.accessToken;  
        if(!token)
        {
            return new Response(
                JSON.stringify({ message: "Token Provide" }),
                { status: 400 }
            );
        }
        const decode = jwt.verify(token, process.env.AccessToken);
        req.user = decode;
        next();
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Something went wrong" }),
            { status: 500 }
        );
    }
}
