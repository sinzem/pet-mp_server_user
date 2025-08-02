// input data validation scheme for zod

import * as z from 'zod'; 

export const feedbackDataInp = z.object({
    user_name: z.string()
                .min(1, 'Name is too short')
                .max(20, 'Name must be a maximum of 20 characters'),
    email: z.email(),
    text: z.string()
           .min(1, "Message text is too short")
           .max(5000, 'Message text is too long'),
});

export type FeedbackDataInput = z.infer<typeof feedbackDataInp>;

