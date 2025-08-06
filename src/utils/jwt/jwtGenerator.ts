import jwt from 'jsonwebtoken'; 

export function generateJwt(id: string, email: string, role: string, expire: string): string { 
    return jwt.sign(
        {id, email, role},  
        String(process.env.SECRET_KEY), 
        {expiresIn: expire} 
    )
};


