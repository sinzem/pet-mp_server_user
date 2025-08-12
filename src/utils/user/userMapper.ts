import { IUserAllData, IUserAllDataToClient } from "../../types/user";

export const userToClient = (user: IUserAllData): IUserAllDataToClient => {
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword as IUserAllDataToClient;
}