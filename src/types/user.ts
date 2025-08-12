import { UUID } from "crypto";
import { ICardData } from "./card";

export type IUserRole = "admin" | "manager" | "affiliate";

export type IUserDataAdd = {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    saveData: boolean;
    role: string;
};

export type IUserData = {
    id: UUID;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    activation: string | null;
    refresh_token: string | null;
    role: IUserRole;
    photo: string | null;
    created_at: Date;
    updated_at: Date;
};

export type IUserDataToClient = Omit<IUserData, "password">;

export type IUserAllData = IUserData & {
    progress: IUserProgressResult;
    cards: ICardData[];
}

export type IUserAllDataToClient = Omit<IUserAllData, "password">;


export type IUserProgressResult = {
    id: UUID;
    user_id: UUID;
    balance: number;
    index: number;
    clicks: number;
    hold: number;
    profit: number;
    budget: number;
    notification: number;
    created_at: Date;
    updated_at: Date;
};