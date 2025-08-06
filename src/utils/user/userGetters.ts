import db from "../../db/postgresql/postgresql";
import { IUserData } from "../../types/user";
import { ApiError } from "../errors/ApiError";

export const getUserByEmail = async (email: string): Promise<IUserData> => {
    let user;
    try {
        user = await db.one('SELECT * FROM user_data WHERE email = $1', [email]);
    } catch (e) {
        throw ApiError.notFound('Request error', `User was not found by this email: ${email}`);
    }

    return user;
}