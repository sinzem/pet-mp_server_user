import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ApiError } from "../utils/errors/ApiError";
import { logger } from "../configs/logger";

export function errorHandler(
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    console.error(err);
    logger.error(err.stack || err.message);

    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation error",
            errors: err,
        });
    }

    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            details: err.details ?? null,
        });
    }
    
    if (err && err.code) {
        if (err.code === '23505') {
            return res.status(409).json({ message: 'Conflict (unique violation)', details: err.detail || null });
        }
        if (err.code === '22P02') {
            return res.status(400).json({ message: 'Invalid input', details: err.detail || null });
        }
        if (err.code === '23503') {
            return res.status(409).json({ message: 'Foreign key violation', details: err.detail || null });
        }
        if (err.code === '23502') {
            return res.status(400).json({ message: 'Not null violation', details: err.detail || null });
        }
    }

    return res.status(500).json({ message: 'Internal Server Error' });
};



// import { Request, Response, NextFunction } from "express";
// import { ZodError } from "zod";
// import { ApiError } from "../utils/errors/ApiError";

// export const errorHandler = (
//     err: any,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     console.error(err);

//     if (err instanceof ZodError) {
//         return res.status(400).json({
//             message: "Validation error",
//             errors: err,
//         });
//     }

//     if (err instanceof ApiError) {
//         return res.status(err.statusCode).json({ message: err.message });
//     }

//     return res.status(500).json({ message: "Unexpected error" });
// };



// middleware/errorHandler.js
