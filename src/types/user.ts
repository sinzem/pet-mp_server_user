import { UUID } from "crypto";

export type IUserRole = "admin" | "manager" | "affiliate";

export type IUserDataAdd = {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
}

export type IUserDataResult = {
    id: UUID;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    activation: string | null;
    refreshToken: string | null;
    role: IUserRole;
    photo: string | null;
    created_at: Date;
    updated_at: Date;
}

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
}