import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";

export function sendEmail(options) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mouhanad.ahmed2@gmail.com",
            pass: "lwvedlzlyeboizaj",
        },
    });

    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Central Blood Bank" <mouhanad.ahmed2@gmail.com>', // sender address
            to: options.email, // list of receivers
            subject: options.sub, // Subject line
            //   text: "Hello world?", // plain text body
            html: emailTemplate(
                options.api,
                options.text,
                options.title,
                options.btn,
            ), // html body
        });

        console.info(
            "Message sent: %s",
            info.messageId,
            typeof options.text,
            options.title,
        );
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }

    main().catch(console.error);
}
