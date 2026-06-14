// Copyright © Connor deBoer 2026

import GetResumeAsText from "../Resume/ResumeReader.js";
import Prompt from "./PromptLLM.js";

// We create a prompt that's suitable for the email
export default async function GetFeedback(jobPosting) {
    const resume = await GetResumeAsText();
    const prompt = `You have 1 goal, get Ciara Delaney this job

    Here is the job Posting (Body.InnerText):
    ${jobPosting}

    Here is Ciara's resume
    ${resume}

    The only way to get Ciara Delaney this job is to offer insight into how she should modify her resume to match the job while standing out

    Remember your speaking directly to Ciara, be polite

    Rules:
    - Focus on reframing existing experience, never invent anything
    - Find ways to naturally integrate keywords and phrases from the job posting into existing experience
    - Only output step by step instructions on what exactly to change and why in an ordered list
    - Never use any formatting besides numbers denoting the order of the ordered list
    - Never focus on anything that isn't Ciara's resume or the job posting
    - Save larger changes (Adding/removing whole sections, changing how her previous experience is laid out, etc) for the end of your message
    `;

    return await Prompt(prompt);
}