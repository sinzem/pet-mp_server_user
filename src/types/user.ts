export type IUserRole = "admin" | "manager" | "affiliate";

export type IUserData = {
    id: number;
    name: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
    activation: string | null;
    refreshToken: string | null;
    role: IUserRole;
    photo: string | null;
}

export type IUserProgress = {
    id: number;
    balance: number;
    index: number;
    clicks: number;
    hold: number;
    profit: number;
    budget: number;
    notification: number;
}