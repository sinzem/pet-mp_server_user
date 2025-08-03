import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import db from '../../db/postgresql/postgresql';
import { logger } from '../../configs/logger';
import { IUserDataToClient } from '../../types/user';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../../utils/errors/ApiError';
import { transporter } from '../mailer/mailerController';
import userController from '../user/userController';


class AuthController {
    async registration(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, IUserDataToClient>>> {
        // logger.info('Request to create an account');

        const {first_name, last_name, phone, email, password, save_data} = req.body;
        const reqRole = req.params.id;

        let role: string | null = null;
        if (reqRole === process.env.REG_ADMIN) role = "admin";
        if (reqRole === process.env.REG_MANAGER) role = "manager";
        if (reqRole === process.env.REG_AFFILIATE) role = "affiliate";
        if (!role) throw ApiError.badRequest("Bad Request", "Incorrect role specification");
    
        let activation = uuidv4();
        const saveData = save_data ? "1" : "0";
        activation = activation.replace(/./, saveData);

        let regResult = null;
        try {
            regResult = await db.one(
                `INSERT INTO user_data(first_name, last_name, phone, email, password, role, activation)
                 VALUES($1, $2, $3, $4, $5, $6, $7)
                 RETURNING *`,
                [first_name, last_name, phone, email, password, role, activation]
            );
        } catch (e) {
            next(e);
        }

        if (!regResult) throw ApiError.conflict("Unexpected error", "Error saving user data");

        const link = `${process.env.SERVER_URL}/api/auth/confirmation/${activation}`;

        await transporter.sendMail({
            to: email,
            from: String(process.env.MAIL_SENDER),
            subject: "Account activation on " + process.env.APP_NAME, 
            text: "",
            html:  `
                <div>
                    <h1>To activate your account on ${process.env.APP_NAME} website, follow the link below</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
            })

        const user = userController.userToClient(regResult);

        return res.status(201).json({message: 'Registration success', data: user});  
    }
}

export default new AuthController(); 

