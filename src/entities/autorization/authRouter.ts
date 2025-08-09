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
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authorization
 *     summary: Login 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserRequest'
 *     responses:
 *       200:
 *         description: Successful login, if user has forgotten the password, a login link will be sent to his email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationUserResponse'
 */
router.post('/login', reqBodyValidate(loginUser), authController.login);


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


/**
 * @openapi
 * /api/auth/refresh:
 *   get:
 *     tags:
 *       - Authorization
 *     summary: Get or refresh access token, save to SessionStorage 
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Refresh token stored in cookies
 *     responses:
 *       200:
 *         description: Access token created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsIn.lsLmNvbSIsInJvbGUiOiJhZG1pbiIsIm.TSDHE9oOyo97PHrKU
 */
router.get('/refresh', authController.refresh);


/**
 * @openapi
 * /api/auth/logout:
 *   get:
 *     tags:
 *       - Authorization
 *     summary: Logout (refreshToken will be deleted, on the client side you need to clear the accessToken and redirect to another page) 
 *     parameters:
 *       - in: cookie
 *         name: refreshToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Refresh token deleted from cookies and database
 *     responses:
 *       200:
 *         description: Successful logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 null
 */
router.get('/logout', authController.logout);

export default router; 