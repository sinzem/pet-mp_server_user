import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { createUserRequestSchema, createUserResponseSchema, GetUserAllDataResponse, userProgress } from "../entities/user/schemas/index";
import { loginUserRequestSchema, 
    registrationUserRequestSchema, 
    registrationUserResponseSchema 
} from "../entities/autorization/schemas";
import { messageToAdmin } from "../entities/mailer/schemas";
import { CreateCardRequest, CreateCardResponse } from "../entities/card/schemas";

const port = process.env.PORT || 5001; 
const host = process.env.HOST;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
        },
        components: {
            schemas: {
                CreateUserRequest: createUserRequestSchema,
                CreateUserResponse: createUserResponseSchema,
                RegistrationUserRequest: registrationUserRequestSchema,
                RegistrationUserResponse: registrationUserResponseSchema,
                LoginUserRequest: loginUserRequestSchema,
                MessageToAdmin: messageToAdmin,
                UserProgress: userProgress,
                CreateCardRequest,
                CreateCardResponse,
                GetUserAllDataResponse
            },
        },
        servers: [{ url: `http://${host}:${port}` }],
    },
    apis: ["./src/routes/*.ts", "./src/entities/**/*.ts"], 
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};