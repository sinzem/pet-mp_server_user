import { NextFunction } from "express";
import db from "../../db/postgresql/postgresql";
import { ApiError } from "../errors/ApiError";


export const dbOne = async (command: string, array: any[]) => {
    let entity;
    try {
        entity = await db.one(command, array);
    } catch (e) {
        throw ApiError.conflict("Unexpected error", `Error saving data: ${e}`)
    }

    return entity;
} 