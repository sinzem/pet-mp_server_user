// input data validation scheme for zod

import * as z from 'zod'; 

export const createCardData = z.object({
    card_number: z.number()
                 .min(16, 'Card number is too short')
                 .max(16, 'Card number must be a maximum of 24 characters'),
    initials: z.string()
                .min(3, 'Initials is too short')
                .max(50, 'Initials must be a maximum of 50 characters'),
    card_cvc: z.number()
            .min(3, 'cvc is too short')
            .max(3, 'cvc number is too long'),
    expiry: z.string()
             .min(5, 'Expiry date is too short')
             .max(5, 'Expiry date is too long'),
    system: z.string()
               .min(2, "Card system is too short")
               .max(50, 'Card system is too long'),
});

export type ICreateCardData = z.infer<typeof createCardData>;