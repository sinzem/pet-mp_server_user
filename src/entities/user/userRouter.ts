import express from 'express';
import userController from "./userController";
import { reqBodyValidate } from '../../middleware/validatiors/reqBodyValidator';
import { createUserDataSchema } from './user.schema';


const router = express.Router()

router.post('/create', reqBodyValidate(createUserDataSchema), userController.create);

export default router; 