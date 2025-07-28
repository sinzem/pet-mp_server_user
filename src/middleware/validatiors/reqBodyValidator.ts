import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const reqBodyValidate = (schema: ZodType) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        schema.parse(req.body);
        next();
    } catch (err: any) {
        const messages: string[] = [];
        const errors = JSON.parse(err?.message);
        if (errors && Array.isArray(errors)) errors.forEach((i: any) => messages.push(i?.message))
        return res.status(400).json({
            message: "Validation error",
            errors: messages,
        });
    }
};