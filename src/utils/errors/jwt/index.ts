import jwt from 'jsonwebtoken'; 

export function generateJwt(id: number, email: string, role: string, expire: string): string { 
    return jwt.sign(
        {id, email, role},  
        String(process.env.SECRET_KEY), 
        {expiresIn: expire} 
    )
};