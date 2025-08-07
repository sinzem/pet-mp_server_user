import jwt from 'jsonwebtoken'; 

export function generateJwt(id: string, email: string, role: string, expire: string): string { 
    
    return jwt.sign(
        {id, email, role},  
        String(process.env.JWT_SECRET_KEY), 
        {expiresIn: expire} 
    )
};


export function updateRefreshToken(token: string, id: string, email: string, role: string, expire: string): string {
    let decoded: any;
    try {
        decoded = jwt.verify(token, String(process.env.JWT_SECRET_KEY));
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












