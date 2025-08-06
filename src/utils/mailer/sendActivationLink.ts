import { transporter } from "../../entities/mailer/mailerController"
import { ApiError } from "../errors/ApiError";

export const sendActivationLink = async (link: string, email: string): Promise<void> => {
    try {
        await transporter.sendMail({
            to: email,
            from: String(process.env.MAIL_SENDER),
            subject: "Account activation on " + process.env.APP_NAME, 
            text: "",
            html:  `
                <div>
                    <h1>To activate your account on ${process.env.APP_NAME} website, follow the link below</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        })
    } catch (e) {
        throw ApiError.internal("Internal Server Error", `Error sending link to confirm email address`); 
    }
}