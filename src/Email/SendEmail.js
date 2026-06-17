// Copyright © Connor deBoer 2026

import { Resend } from 'resend';

// body = AI_SLOP.replace(/\n/g, '<br />')
export default async function SendEmail(body) {
    if (body == "") {
        console.log("Empty Email Body Passed, Aborting");
        return;
    }
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        const from = process.env.RESEND_FROM;
        const to = process.env.RESEND_TO;
        const subject = process.env.RESEND_SUBJECT;

        await resend.emails.send({
            from: from,
            to: to,
            subject: subject,
            html: body
        });
        console.log("Email Sent Successfully");
    } catch (error) {
        console.log("Error sending email");
        throw error
    }
}