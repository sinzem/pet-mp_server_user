import { RegistrationUserRequest as registrationUserRequestSchema, 
         RegistrationUserResponse as registrationUserResponseSchema } from "./swagger/schema";
import { registrationUserData as registrationUser } from "./zod/registration.schema";

export {
    registrationUserRequestSchema,
    registrationUserResponseSchema,
    registrationUser
}