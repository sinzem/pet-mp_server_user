import {Request, Response} from 'express';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import { UserData } from '../../db/models'; 


class UserController {
    async create(req: Request, res: Response) {
        const {name, surname, phone, email, password} = req.body; 

        const user = await UserData.create({name, surname, phone, email, password}); 

        return res.json(user);
    }
}

export default new UserController(); 

function generateJwt(id: number, email: string, role: string): string { 
    return jwt.sign(
        {id, email, role},  
        process.env.SECRET_KEY, 
        {expiresIn: "24h"} 
    )
};