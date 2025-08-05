import { IUserData, IUserDataToClient } from "../../types/user";

export const userToClient = (user: IUserData): IUserDataToClient => {
    const {password, ...userWithoutPassword} = user;
    return userWithoutPassword as IUserDataToClient;
}