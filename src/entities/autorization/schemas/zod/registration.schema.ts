// input data validation scheme for zod

import * as z from 'zod'; 

export const registrationUserData = z.object({
    first_name: z.string()
        .min(1, 'First name is too short')
        .max(20, 'First name must be a maximum of 20 characters'),
    last_name: z.string()
        .min(1, 'Last name is too short')
        .max(20, 'Last name must be a maximum of 20 characters'),
    phone: z.string()
        .min(13, 'Phone number is too short')
        .max(20, 'Phone number is too long'),
    email: z.email()
        .max(100, 'Email is too long'),
    password: z.string()
        .min(6, "Password is too short")
        .max(50, 'Password is too long'),
    saveData: z.boolean(),
    role: z.string()
        .min(4, 'Role is too short')
        .max(50, 'Role is too long'),
});

export type registrationUserInput = z.infer<typeof registrationUserData>;


export const loginUserData = z.object({
    email: z.email()
        .max(100, 'Email is too long'),
    password: z.string()
        .max(50, 'Password is too long'),
    forgotPassword: z.boolean(),
    saveData: z.boolean(),
});

export type loginUserInput = z.infer<typeof registrationUserData>;