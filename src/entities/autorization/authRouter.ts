import express from 'express';
import { reqBodyValidate } from '../../middleware/validatiors/reqBodyValidator';
import { createUserDataSchema } from '../user/schemas';
import authController from './authController';
import { registrationUser } from './schemas';

const router = express.Router()

/**
 * @openapi
 * /api/auth/reg/:id:
 *   post:
 *     tags:
 *       - Authorization
 *     summary: Registration a new user (add id to define role)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationUserRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationUserResponse'
 */
router.post('/auth/:id', reqBodyValidate(registrationUser), authController.registration);

export default router; 