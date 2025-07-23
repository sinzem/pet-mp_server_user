import { ICorsConfig } from "../types/cors";

const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(",") || [];

export const corsConfig = (): ICorsConfig => {
    return {
        origin: (origin, callback) => {
            if (!origin || !allowedOrigins.includes(origin)) {
                return callback(new Error('Not allowed by CORS'), false);
            }
            return callback(null, true);
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        // preflightContinue: false,
        optionsSuccessStatus: 200,
    }
}

//===============================
// export const corsConfig: ICorsConfig = {
//     origin: allowedOrigins,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//     // preflightContinue: false,
//     optionsSuccessStatus: 200,
// };
//===============================
// export const corsConfig: ICorsConfig = {
//     origin: function (
//         origin: string | undefined,
//         callback: (err: Error | null, allow?: boolean) => void
//     ) {
//         if (!origin || !allowedOrigins.includes(origin)) {
//           return callback(new Error('Not allowed by CORS'), false);
//         }
//         return callback(null, true);
//     },
//     // origin: function (origin, callback) {
//     //     if (!origin) return callback(null, false); // блокируем запросы без origin (например, curl)
//     //     if (allowedOrigins.includes(origin)) {
//     //         callback(null, true);
//     //     } else {
//     //         callback(new Error('Not allowed by CORS'));
//     //     }
//     // },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     optionsSuccessStatus: 200,
// };
//====================================




