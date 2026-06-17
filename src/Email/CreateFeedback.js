// Copyright © Connor deBoer 2026

import Filter from "../LLM/Filter.js";
import GetFeedback from "../LLM/Feedback.js";
import GetFilteredJobs from "../Resume/GetEnoughJobs.js";

export default async function CreateFeedback() {
    // The jobs we're gonna send
    const jobs = await GetFilteredJobs();

    console.log("Starting Feedback");
    for (let i = 0; i < jobs.length; ++i) {
        let job = jobs[i];
        if (job == null)
            continue;

        console.log(`Creating Feedback For Job #${i + 1}`);
        jobs[i].feedback = await GetFeedback(job);
    }
    console.log("Finished feedback");
    // return {
    //    id,
    //    redirect,
    //    company,
    //    title,
    //    desc,
    //    feedback
    // }
    return jobs;
}