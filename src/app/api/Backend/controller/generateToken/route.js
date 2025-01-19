import { User} from "../../models/User"

export const generateToken = async (id)  =>{
    try {
        const user = await User.findById(id)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        return {accessToken,refreshToken};
    } catch (error) {
        return new Response(JSON.stringify({ message: 'something went wrong' }), { status: 500 });
    }
}