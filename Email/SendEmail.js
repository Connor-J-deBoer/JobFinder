// Copyright © Connor deBoer 2026

import { Resend } from 'resend';
import GetEmailBody from './CreateEmail.js'

const resend = new Resend(process.env.RESEND_API_KEY);
const rawBody = await GetEmailBody();

// Stitch the AI slop together so it's readable enough
let resendHtml = "";
const urls = Object.keys(rawBody);
for (let i = 0; i < urls.length; ++i) {
    if (rawBody[urls[i]] == null)
        continue;
    resendHtml += `Job Link: ${urls[i]}\n${rawBody[urls[i]]}\n\n`
}

await resend.emails.send({
    from: "Your Love <ceo@madqueeninc.com>",
    to: "connor.deboer04@gmail.com",
    subject: "A Quick Chore",
    html: resendHtml.replace(/\n/g, '<br />')
});