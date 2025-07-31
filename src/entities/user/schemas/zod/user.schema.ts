// input data validation scheme for zod

import * as z from 'zod'; 

export const createUserData = z.object({
    first_name: z.string()
                 .min(1, 'First name is too short')
                 .max(20, 'First name must be a maximum of 20 characters'),
    last_name: z.string()
                .min(1, 'Last name is too short')
                .max(20, 'Last name must be a maximum of 20 characters'),
    phone: z.string()
            .min(13, 'Phone number is too short')
            .max(20, 'Phone number is too long'),
    email: z.email(),
    password: z.string()
               .min(6, "Password is too short")
               .max(50, 'Password is too long'),
});

export type CreateUserDataInput = z.infer<typeof createUserData>;