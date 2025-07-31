import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import db from '../../db/postgresql/postgresql';
import { logger } from '../../configs/logger';


class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        const {first_name, last_name, phone, email, password} = req.body;
        // logger.info('Request to create an account'); 

        try {
            const result = await db.one(
                `INSERT INTO user_data(first_name, last_name, phone, email, password)
                 VALUES($1, $2, $3, $4, $5)
                 RETURNING *`,
                [first_name, last_name, phone, email, password]
            );
            
            return res.status(201).json({message: 'User created successfully', data: result});
        } catch (e) {
            next(e);
        }

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