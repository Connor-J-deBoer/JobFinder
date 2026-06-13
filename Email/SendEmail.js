// Copyright © Connor deBoer 2026

import { Resend } from 'resend';
import GetEmailBody from './CreateEmail.js'

const resend = new Resend(process.env.RESEND_API_KEY);
const rawBody = await GetEmailBody();

//TODO: Stitch the AI slop together so it's readable enough
let resendHtml = "";
const urls = Object.keys(rawBody);
for (let i = 0; i < urls.length; ++i) {
    console.log(`URL: ${urls[i]}\nBODY: ${rawBody[urls[i]]}`);
}

//TODO: Fix our GetEmailBody so that it looks correct with 20 jobs
// await resend.emails.send({
//     from: "You're Love <ceo@madqueeninc.com>",
//     to: "ciaradelaney915@gmail.com",
//     subject: "A Quick Chore",
//     html: resendHtml
// });