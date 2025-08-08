import jwt from 'jsonwebtoken';
import { IPayloadFromToken } from "../../types/jwt";
import { ApiError } from '../errors/ApiError'; 

export async function generateJwt(id: string, email: string, role: string, expire: string): Promise<string> { 
    
    return await jwt.sign(
        {id, email, role},  
        String(process.env.JWT_SECRET_KEY), 
        {expiresIn: expire} 
    )
};


export async function updateRefreshToken(token: string, id: string, email: string, role: string, expire: string): Promise<string> {
    let decoded: any;
    try {
        decoded = await jwt.verify(token, String(process.env.JWT_SECRET_KEY));
    } catch {
        return generateJwt(id, email, role, expire);
    }

    const now = Math.floor(Date.now() / 1000);
    const oneDay = 60 * 60 * 24;

    const timeLeft = decoded.exp - now;

    if (timeLeft < oneDay) {
        return generateJwt(id, email, role, expire);
    } else {
        return token;
    }
}


export const getPayloadByToken = async (token: string): Promise<IPayloadFromToken> => { 
    try {
        return await jwt.verify(token, String(process.env.JWT_SECRET_KEY));
    } catch (e) {
        throw ApiError.forbidden("Authorization error", "Invalid access token"); 
    }
}












