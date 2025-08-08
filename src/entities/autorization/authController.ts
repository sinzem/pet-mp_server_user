import {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcrypt'; 
import db from '../../db/postgresql/postgresql';
import jwt from 'jsonwebtoken';
import { logger } from '../../configs/logger';
import { IUserDataToClient } from '../../types/user';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../../utils/errors/ApiError';
import { generateJwt, getPayloadByToken, updateRefreshToken } from '../../utils/jwt/jwtGenerator';
import { userToClient } from '../../utils/user/userMapper';
import { checkDataForRoleAssignment } from '../../utils/user/userDataCheckers';
import { getUserByEmail } from '../../utils/db/getters';
import { sendActivationLink } from '../../utils/mailer/sendActivationLink';
import { getEntityById } from '../../utils/db/getters';
import { ApiResponse } from '../../types/response';


class AuthController {

    async registration(req: Request, res: Response<ApiResponse<IUserDataToClient>>, next: NextFunction) {
        // logger.info('Request to create an account');

        const {first_name, last_name, phone, email, password, saveData, role} = req.body;

        const userRole = checkDataForRoleAssignment(role);
    
        let activation = uuidv4();
        const saveDataIndex = saveData ? "1" : "0";
        activation = activation.replace(/./, saveDataIndex);

        const hashPassword = await bcrypt.hash(password, 5);

        let regResult = null;
        try {
            regResult = await db.one(
                `INSERT INTO user_data(first_name, last_name, phone, email, password, role, activation)
                 VALUES($1, $2, $3, $4, $5, $6, $7)
                 RETURNING *`,
                [first_name, last_name, phone, email, hashPassword, userRole, activation]
            );
        } catch (e) {
            next(e);
        }

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

// ====================================================================================

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

        try {
            const updatedAt = new Date();
            await db.one(
                `UPDATE user_data SET activation = $1, refresh_token = $2, updated_at = $3 WHERE id = $4 RETURNING *`,
                ["active", refreshToken, updatedAt, user.id]
            );
        } catch (e) {
            next(e)
        }

        res.cookie('refreshToken', refreshToken, {
            httpOnly: Boolean(Number(process.env.COOKIE_HTTP_ONLY)),
            secure: Boolean(Number(process.env.COOKIE_SECURE)), 
            sameSite: "strict",
            ...(rememberUser && { maxAge: expireVar * 24 * 60 * 60 * 1000 }),
        });

        // return res.redirect(`${process.env.CLIENT_URL}/users/${user.id}`);  
        return res.redirect(`${process.env.SERVER_URL}/api/user/${user.id}`);  
    }

// ====================================================================================    

    async login(req: Request, res: Response<ApiResponse<IUserDataToClient>>, next: NextFunction) {
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
        let refreshToken;
        if (userFromDB.refresh_token) {
            refreshToken = updateRefreshToken(userFromDB.refresh_token, userFromDB.id, email, userFromDB.role, String(expireVar + "d"));
        } else {
            refreshToken = generateJwt(userFromDB.id, email, userFromDB.role, String(expireVar + "d"));
        }

        let activationLink;
        let updatedUser;
        const updatedAt = new Date();
        if (forgotPassword) {
            activationLink = uuidv4();
            try {
                updatedUser = await db.one(
                    `UPDATE user_data SET activation = $1, refresh_token = $2, updated_at = $3 WHERE id = $4 RETURNING *`,
                    [activationLink, refreshToken, updatedAt, userFromDB.id]
                );
            } catch (e) {
                next(e)
            }
        } else {
            try {
                updatedUser = await db.one(
                    `UPDATE user_data SET refresh_token = $1, updated_at = $2 WHERE id = $3 RETURNING *`,
                    [refreshToken, updatedAt, userFromDB.id]
                );
            } catch (e) {
                next(e)
            }
        }

        res.cookie('refreshToken', refreshToken, {
            httpOnly: Boolean(Number(process.env.COOKIE_HTTP_ONLY)),
            secure: Boolean(Number(process.env.COOKIE_SECURE)), 
            sameSite: "strict",
            ...(saveData && { maxAge: expireVar * 24 * 60 * 60 * 1000 }),
        });

        if (forgotPassword) {
            const link = `${process.env.SERVER_URL}/api/auth/confirmation/${activationLink}`;
            await sendActivationLink(link, email);
        } 

        const user = userToClient(updatedUser);
        const message = forgotPassword 
            ? "The account activation link has been sent to the user's email" 
            : "Successful login to your account";
    
        return res.status(200).json({message, data: user}); 
    }

// ====================================================================================

    async refresh(req: Request, res: Response<ApiResponse<{accessToken: string}>>) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw ApiError.unauthorized("Authorization error", "Refresh token not found. Please sign in to continue"); 

        const tokenPayload = await getPayloadByToken(refreshToken);

        const user = await getEntityById("user_data", tokenPayload.id);
        if (!user || user.activation !== "active" || refreshToken !== user.refresh_token) { 
            throw ApiError.unauthorized("Authorization error", "Refresh token is not valid, please sign in to continue"); 
        }

        const expireVar = Number(process.env.JWT_ACCESS_EXPIRE) || 15;
        const accessToken = await generateJwt(user.id, user.email, user.role, String(expireVar + "m"));

        return res.status(200).json({message: "Access token created successfully", data: {accessToken}})
    }
}

export default new AuthController(); 



