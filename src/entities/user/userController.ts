import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import db from '../../db/postgresql/postgresql';
import { logger } from '../../configs/logger';
import { IUserData, IUserDataToClient } from '../../types/user';


class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        const {first_name, last_name, phone, email, password} = req.body;
        // logger.info('Request to create an account'); 
        console.log(req.params.id);
        // try {
        //     const result = await db.one(
        //         `INSERT INTO user_data(first_name, last_name, phone, email, password)
        //          VALUES($1, $2, $3, $4, $5)
        //          RETURNING *`,
        //         [first_name, last_name, phone, email, password]
        //     );
            
        //     return res.status(201).json({message: 'User created successfully', data: result});
        // } catch (e) {
        //     next(e);
        // }
        return res.status(200).json({message: 'User created successfully'})
    }

    userToClient({id, first_name, last_name, phone, email, password, activation, refreshToken, role, photo, created_at, updated_at}: IUserData): IUserDataToClient {
        const userToClient = {id, first_name, last_name, phone, email, activation, refreshToken, role, photo, created_at, updated_at};
        return userToClient as IUserDataToClient;
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