// Copyright © Connor deBoer 2026

import GetResumeAsText from "../Resume/ResumeReader.js";
import Prompt from "./PromptLLM.js";

// We create a prompt that's suitable for the email
export default async function GetFeedback(jobPosting) {
    const resume = await GetResumeAsText();
    const prompt = `You give resume tailoring tips professionally.

    Here is the job Posting (Body.InnerText) of your favorite clients dream job:
    ${jobPosting}

    Here is said clients base resume
    ${resume}

    Make suggestions to your client on how to improve their resume and tailor it to their dream job posting in a gentle but confident tone.
    Rules:
    - Focus on reframing existing experience, never invent anything
    - Find ways to naturally integrate keywords and phrases from the job posting into existing experience
    - Give your tips by starting with a quick break down of why the job is a good fit, bullet point actionable feedback (Change x to y) on their resume, and give an encouraging final word on the fun sounding part of the job
    - Your output is inserted directly into the tips email for the clients dream job, make sure it looks professional`;

    return await Prompt(prompt);
}