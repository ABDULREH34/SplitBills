import { serialize } from "cookie";

export const setCookie = (res, accessToken, refreshToken) => {
    console.log(accessToken);
    
    const accessTokenOptions = {
        httpOnly: true,
        secure: true, // HTTPS required
        sameSite: "None", // Cross-site allowed
        maxAge: 15 * 60 * 1000, // 15 minutes
      };
      
      const refreshTokenOptions = {
        httpOnly: true,
        secure: true, // HTTPS required
        sameSite: "None", // Cross-site allowed
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      };
      

    const accessTokenCookie = serialize("accessToken", accessToken, accessTokenOptions);
    const refreshTokenCookie = serialize("refreshToken", refreshToken, refreshTokenOptions);

    
    res.headers.append("Set-Cookie", accessTokenCookie);
    res.headers.append("Set-Cookie", refreshTokenCookie);
};
