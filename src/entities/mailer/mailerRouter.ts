import express from 'express';
import { reqBodyValidate } from '../../middleware/validatiors/reqBodyValidator';
import { feedbackData } from './schemas';
import mailerController from './mailerController';



const router = express.Router()

/**
 * @openapi
 * /api/mailer/feedback:
 *   post:
 *     tags:
 *       - Mailer
 *     summary: Feedback to admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageToAdmin'
 *     responses:
 *       200:
 *         description: Message sent successfully
 */
router.post('/feedback', reqBodyValidate(feedbackData), mailerController.sendMessageToAdmin);

export default router; 