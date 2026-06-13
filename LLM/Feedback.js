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
    - Only offer resume improvement instructions (1. Change X to Y Because Z) after thinking about it for a long time
    - Never output anything that isn't the title ("Here are your personalized resume tips!") or improvement instructions
    - Only output the title, followed by an ordered list of improvement instructions
    `;

    return await Prompt(prompt);
}