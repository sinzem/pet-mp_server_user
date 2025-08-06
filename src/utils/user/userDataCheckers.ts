import { ApiError } from "../errors/ApiError";

export const checkDataForRoleAssignment = (role: string): string => {
    let userRole: string | null = null;
    if (role === process.env.REG_ADMIN) userRole = "admin";
    if (role === process.env.REG_MANAGER) userRole = "manager";
    if (role === process.env.REG_AFFILIATE) userRole = "affiliate";
    if (!userRole) throw ApiError.badRequest("Bad Request", "Incorrect role specification");

    return userRole;
}


