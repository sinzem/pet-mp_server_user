import { RegistrationUserRequest as registrationUserRequestSchema, 
         RegistrationUserResponse as registrationUserResponseSchema,
         LoginUserRequest as loginUserRequestSchema } from "./swagger/schema";
import { registrationUserData as registrationUser,
         loginUserData as loginUser,
         IRegistrationUser, 
         ILoginUser
        } from "./zod/registration.schema";

export {
    registrationUserRequestSchema,
    registrationUserResponseSchema,
    loginUserRequestSchema,
    registrationUser,
    loginUser,
    IRegistrationUser,
    ILoginUser
}