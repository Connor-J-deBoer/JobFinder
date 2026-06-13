// Copyright © Connor deBoer 2026

import Prompt from "./PromptLLM.js";
import GetResumeAsText from "../Resume/ResumeReader.js";

// We create a prompt that's suitable for selecting the job
export default async function Filter(Job) {
    const resume = await GetResumeAsText();
    const prompt = `You ensure a given job is a good fit professionally.
    
    Here is the job we found:
    ${Job}
    
    Here is your favorite clients resume:
    ${resume}
    
    Think hard about wether or not your favorite client could be qualified, if there's any chance they are then make sure they get through.
    Rules:
    - Output only 1 of 2 words ('True' or 'False')
    - Never ask a question or output anything other than 1 of the 2 allowed words ('True' or 'False')`;

    return (await Prompt(prompt)).trim().toLowerCase() === 'true';
}