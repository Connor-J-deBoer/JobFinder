// Copyright © Connor deBoer 2026

import GetResumeAsText from "../Resume/ResumeReader.js";
import Prompt from "./PromptLLM.js";

// We create a prompt that's suitable for the email
export default async function GetFeedback(job) {
    const resume = await GetResumeAsText();
    const prompt = `You have 1 goal, get Ciara Delaney this job

    Here is the job Posting (Body.InnerText):
    ${job.desc}

    Here is Ciara's resume
    ${resume}

    The only way to get Ciara Delaney this job is to offer insight into how she should modify her resume to match the job while standing out

    Remember your speaking directly to Ciara, be polite

    Rules:
    - Focus on reframing existing experience, never invent anything
    - Find ways to naturally integrate keywords and phrases from the job posting into existing experience
    - Only output step by step instructions on what exactly to change and why in an ordered list
    - Do not use bold, asterisks, dashes, headers, sub-bullets, or any markdown syntax of any kind. Each numbered step must be written as plain prose only.
    - Every suggestion must reference content already present in Ciara's resume. Do not suggest adding any skill, tool, software, certification, duty, or phrasing that does not already appear in her resume. If a job posting requires something absent from her resume, skip it entirely — do not suggest she fabricate it
    - Never focus on anything that isn't Ciara's resume or the job posting
    - If a suggestion involves a larger structural change such as adding or removing a section, place that step last in the numbered list.

    Example:
    GOOD : '3. Change skill "Kitchen Prep" to "Deep Cleaning" to align more closely with the job posting'
    BAD  : '1. **Job Title and Company Name:** Change "Spiritleaf" to "Value Buds" in the job title when referring to your experience as a Key Holder. This helps align with the company name mentioned in the job posting.'
    `;

    return await Prompt(prompt);
}