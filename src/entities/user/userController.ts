import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcrypt'; 
import db from '../../db/postgresql/postgresql';
import { logger } from '../../configs/logger';
import { IUserData, IUserDataToClient } from '../../types/user';
import { ApiError } from '../../utils/errors/ApiError';
import { userToClient } from '../../utils/user/userMapper';


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


    async getUser(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id.trim();

        let user;
        try {
            user = await db.one('SELECT * FROM user_data WHERE id = $1', [userId]);
        } catch (e) {
            throw ApiError.notFound('Request error', `User was not found by this ID: ${userId}`);
        }
        if (!user) throw ApiError.notFound("Request error", "User not found");
        
        const userDataResponse = userToClient(user);

        return res.status(200).json({message: "User data found successfully", data: userDataResponse});
    }
}

export default new UserController(); 

