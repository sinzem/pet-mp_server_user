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
import { generateJwt } from '../../utils/errors/jwt';
import cookieParser from 'cookie-parser';


class AuthController {
    async registration(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, IUserDataToClient>>> {
        // logger.info('Request to create an account');

        const {first_name, last_name, phone, email, password, save_data} = req.body;
        const reqRole = req.params.id.trim();

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


    async confirmation(req: Request, res: Response, next: NextFunction) {
        // logger.info('Request to confirmation an account');

        const checkLink = req.params.id.trim();

        let user;
        try {
            user = await db.oneOrNone(
                'SELECT * FROM user_data WHERE activation = $1 LIMIT 1',
                [checkLink]
            );
        } catch (e) {
            next(e)
        }

        if (!user) throw ApiError.notFound("Request error", "User not found");

        const expireVar = Number(process.env.JWT_REFRESH_EXPIRE) || 15;
        const rememberUser = user.activation[0] === "1" ? true : false;
        const refreshToken = generateJwt(user.id, user.email, user.role, String(expireVar + "d"));

        let updated;
        try {
            const updatedAt = new Date();
            updated = await db.one(
                `UPDATE user_data SET activation = $1, refresh_token = $2, updated_at = $3 WHERE id = $4 RETURNING *`,
                ["active", refreshToken, updatedAt, user.id]
            );
        } catch (e) {
            next(e)
        }

        if (!updated) throw ApiError.internal("Server error", "Account verification error");

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: Boolean(process.env.COOKIE_SECURE), 
            sameSite: 'strict',
            ...(rememberUser && { maxAge: expireVar * 24 * 60 * 60 * 1000 }),
        });

        return res.redirect(`${process.env.CLIENT_URL}/users/${user.id}`);  
    }
}

export default new AuthController(); 


          

