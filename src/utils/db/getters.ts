import db from "../../db/postgresql/postgresql"
import { ApiError } from "../errors/ApiError";
import { IUserData } from "../../types/user";

export const getEntityById = async (table: string, id: string) => {
    try {
        return await db.one(`SELECT * FROM ${table} WHERE id = $1`, [id]);
    } catch (e) {
        throw ApiError.notFound('Request error', `Data was not found by this ID: ${id}`);
    }
}


export const getUserByEmail = async (email: string): Promise<IUserData> => {
    let user;
    try {
        user = await db.one('SELECT * FROM user_data WHERE email = $1', [email]);
    } catch (e) {
        throw ApiError.notFound('Request error', `User was not found by this email: ${email}`);
    }

    return user;
}

