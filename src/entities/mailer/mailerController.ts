import {NextFunction, Request, Response} from 'express';
import nodemailer from "nodemailer";
import { logger } from '../../configs/logger';


export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === "true",
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASSWORD,
    },
})


class MailerController {

    async sendMessageToAdmin(req: Request, res: Response, next: NextFunction) {
        // logger.info('Request to send message to addmin'); 
        const {userName, email, text} = req.body;

        try {
            const mailOptions = {
                from: process.env.MAIL_NAME,
                to: process.env.MAIL_ADMIN,
                subject: `New message from ${userName}`,
                text: text,
                html: `
                    <div>
                        <h1>New message from Manager Platform</h1>
                        <p><strong>Name:</strong> ${userName}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Message:</strong> ${text}</p>
                    </div>
                `,
            }
    
            await transporter.sendMail(mailOptions);

            return res.status(200).json({message: 'Message sent successfully'});
        } catch (e) {
            next(e);
        }
    }
}

export default new MailerController(); 