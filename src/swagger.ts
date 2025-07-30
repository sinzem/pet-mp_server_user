import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { CreateUserRequestSchema, CreateUserResponseSchema } from "./entities/user/schemas/swagger/schema";

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
                CreateUserRequest: CreateUserRequestSchema,
                CreateUserResponse: CreateUserResponseSchema,
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