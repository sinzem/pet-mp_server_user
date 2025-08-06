import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcrypt'; 
import db from '../../db/postgresql/postgresql';
import { logger } from '../../configs/logger';
import { IUserDataToClient } from '../../types/user';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../../utils/errors/ApiError';
import { generateJwt } from '../../utils/jwt/jwtGenerator';
import cookieParser from 'cookie-parser';
import { userToClient } from '../../utils/user/userMapper';
import { checkDataForRoleAssignment } from '../../utils/user/userDataCheckers';
import { getUserByEmail } from '../../utils/user/userGetters';
import { sendActivationLink } from '../../utils/mailer/sendActivationLink';
import { dbOne } from '../../utils/db/dbOne';


class AuthController {

    async registration(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, IUserDataToClient>>> {
        // logger.info('Request to create an account');

        const {first_name, last_name, phone, email, password, saveData, role} = req.body;

        const userRole = checkDataForRoleAssignment(role);
    
        let activation = uuidv4();
        const saveDataIndex = saveData ? "1" : "0";
        activation = activation.replace(/./, saveDataIndex);

        const hashPassword = await bcrypt.hash(password, 5);

        // let regResult = null;
        // try {
        //     regResult = await db.one(
        //         `INSERT INTO user_data(first_name, last_name, phone, email, password, role, activation)
        //          VALUES($1, $2, $3, $4, $5, $6, $7)
        //          RETURNING *`,
        //         [first_name, last_name, phone, email, hashPassword, userRole, activation]
        //     );
        // } catch (e) {
        //     next(e);
        // }

        // if (!regResult) throw ApiError.conflict("Unexpected error", "Error saving user data");
        const command = `INSERT INTO user_data(first_name, last_name, phone, email, password, role, activation) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
        const keys = [first_name, last_name, phone, email, hashPassword, userRole, activation];

        const regResult = await dbOne(command, keys);

        try {
            await db.none(`INSERT INTO user_progress(user_id) VALUES($1)`, [regResult.id]);
        } catch (e) {
            next(e);
        }

        const link = `${process.env.SERVER_URL}/api/auth/confirmation/${activation}`;
        await sendActivationLink(link, email);

        const user = userToClient(regResult);
        return res.status(201).json({message: "The account activation link has been sent to the user's email", data: user});  
    }


    async confirmation(req: Request, res: Response, next: NextFunction): Promise<void> {
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

        // let updated;
        // try {
        //     const updatedAt = new Date();
        //     updated = await db.one(
        //         `UPDATE user_data SET activation = $1, refresh_token = $2, updated_at = $3 WHERE id = $4 RETURNING *`,
        //         ["active", refreshToken, updatedAt, user.id]
        //     );
        // } catch (e) {
        //     next(e)
        // }

        // if (!updated) throw ApiError.internal("Server error", "Account verification error");
        const updatedAt = new Date();
        const command = `UPDATE user_data SET activation = $1, refresh_token = $2, updated_at = $3 WHERE id = $4 RETURNING *`;
        const keys = ["active", refreshToken, updatedAt, user.id];

        const updated = await dbOne(command, keys);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: Boolean(Number(process.env.COOKIE_HTTP_ONLY)),
            secure: Boolean(Number(process.env.COOKIE_SECURE)), 
            sameSite: "strict",
            ...(rememberUser && { maxAge: expireVar * 24 * 60 * 60 * 1000 }),
        });

        // return res.redirect(`${process.env.CLIENT_URL}/users/${user.id}`);  
        return res.redirect(`${process.env.SERVER_URL}/api/user/${user.id}`);  
    }


    async login(req: Request, res: Response, next: NextFunction)/* : Promise<Response<any, Record<string, IUserDataToClient>>> */ {
        const {email, password, forgotPassword, saveData} = req.body;

        const userFromDB = await getUserByEmail(email);

        if (userFromDB.activation === null || userFromDB.activation.length > 10) {
            throw ApiError.forbidden("Authorization error", "Confirm your email address"); 
        } 

        if (!forgotPassword) {
            const passwordEquals = await bcrypt.compare(password, userFromDB.password); 
            if (!passwordEquals) throw ApiError.forbidden("Authorization error", "Wrong password");
        }
        
        const expireVar = Number(process.env.JWT_REFRESH_EXPIRE) || 15;
        const refreshToken = generateJwt(userFromDB.id, email, userFromDB.role, String(expireVar + "d"));

        let activationLink;
        let updatedUser;
        let command;
        let keys;
        const updatedAt = new Date();
        if (forgotPassword) {
            activationLink = uuidv4();
            // try {
            //     updatedUser = await db.one(
            //         `UPDATE user_data SET activation = $1, refresh_token = $2, updated_at = $3 WHERE id = $4 RETURNING *`,
            //         [activationLink, refreshToken, updatedAt, userFromDB.id]
            //     );
            // } catch (e) {
            //     next(e)
            // }
            command = `UPDATE user_data SET activation = $1, refresh_token = $2, updated_at = $3 WHERE id = $4 RETURNING *`;
            keys = [activationLink, refreshToken, updatedAt, userFromDB.id];
        } else {
            // try {
            //     updatedUser = await db.one(
            //         `UPDATE user_data SET refresh_token = $1, updated_at = $2 WHERE id = $3 RETURNING *`,
            //         [refreshToken, updatedAt, userFromDB.id]
            //     );
            // } catch (e) {
            //     next(e)
            // }
            command = `UPDATE user_data SET refresh_token = $1, updated_at = $2 WHERE id = $3 RETURNING *`;
            keys = [refreshToken, updatedAt, userFromDB.id];
        }
        updatedUser = await dbOne(command, keys);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: Boolean(Number(process.env.COOKIE_HTTP_ONLY)),
            secure: Boolean(Number(process.env.COOKIE_SECURE)), 
            sameSite: "strict",
            ...(saveData && { maxAge: expireVar * 24 * 60 * 60 * 1000 }),
        });

        if (forgotPassword) {
            const link = `${process.env.SERVER_URL}/api/auth/confirmation/${activationLink}`;
            await sendActivationLink(link, email)
        } 

        const user = userToClient(updatedUser);
        const message = forgotPassword 
            ? "The account activation link has been sent to the user's email" 
            : "Successful login to your account";
    
        return res.status(201).json({message, data: user}); 
    }

}

export default new AuthController(); 


          

