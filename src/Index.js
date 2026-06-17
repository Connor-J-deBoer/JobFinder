// Copyright © Connor deBoer 2026

import { saveSentJobs } from './CheckDuplicates/db.js';
import CreateFeedback from './Email/CreateFeedback.js'
import SendEmail from './Email/SendEmail.js';

console.log("Starting!");
// Gets our fully created 
const jobs = await CreateFeedback();
// Stitch the AI slop together so it's readable enough
let resendBody = "";
for (let i = 0; i < jobs.length; ++i) {
    resendBody += `Job Link: ${jobs[i].redirect}\n${jobs[i].feedback}\n\n`
}
// Make it email friendly
resendBody = resendBody.replace(/\n/g, '<br />')

try {
    await SendEmail(resendBody);
    saveSentJobs(jobs);
} catch (error) {
    console.log(error);
}