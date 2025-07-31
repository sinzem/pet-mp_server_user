import express from 'express';
import userController from "./userController";
import { reqBodyValidate } from '../../middleware/validatiors/reqBodyValidator';
import { createUserDataSchema } from './schemas/index';


const router = express.Router()

/**
 * @openapi
 * /api/user/create:
 *   post:
 *     tags:
 *       - Users
 *     summary: Creating a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 */
router.post('/create', reqBodyValidate(createUserDataSchema), userController.create);

export default router; 