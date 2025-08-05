import express from 'express';
import userController from "./userController";
import { reqBodyValidate } from '../../middleware/validatiors/reqBodyValidator';
import { createUserDataSchema } from './schemas/index';


const router = express.Router()

/**
 * @openapi
 * /api/user/:id:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user data by ID
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the user
 *        schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 */
router.get('/:id', userController.getUser);

export default router; 