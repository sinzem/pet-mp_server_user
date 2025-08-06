import express from 'express';
import { reqBodyValidate } from '../../middleware/validatiors/reqBodyValidator';
import authController from './authController';
import { loginUser, registrationUser } from './schemas';

const router = express.Router()

/**
 * @openapi
 * /api/auth/reg:
 *   post:
 *     tags:
 *       - Authorization
 *     summary: Registration a new user 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationUserRequest'
 *     responses:
 *       201:
 *         description: User registered successfully, a link to confirm the email address will be sent to the user's email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationUserResponse'
 */
router.post('/reg', reqBodyValidate(registrationUser), authController.registration);

/**
 * @openapi
 * /api/auth/confirmation/:id:
 *   get:
 *     tags:
 *       - Authorization
 *     summary: User clicks on the link sent to his email to confirm the address
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: ID of the user
 *        schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user will be redirected to his personal account page
 */
router.get('/confirmation/:id', authController.confirmation);

router.post('/login', reqBodyValidate(loginUser), authController.login);

export default router; 