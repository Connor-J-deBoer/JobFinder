// Copyright © Connor deBoer 2026

import Prompt from "./PromptLLM.js";
import GetResumeAsText from "../Resume/ResumeReader.js";

// We create a prompt that's suitable for selecting the job
export default async function Filter(Job) {
    const resume = await GetResumeAsText();
    const prompt = `Your 1 and only goal is to filter job postings based off a base resume
    
    Here is the job:
    ${Job.desc}
    
    Here is the resume:
    ${resume}
    
    The resume will be tailored ONLY if you think it's a close enough fit to make

    Rules:
    - Output only 1 of 2 words ('True' or 'False')
    - Never ask a question or output anything other than 1 of the 2 allowed words ('True' or 'False')`;

    return (await Prompt(prompt)).trim().toLowerCase() === 'true';
}