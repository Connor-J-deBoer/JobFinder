// Copyright © Connor deBoer 2026

import { chromium } from "playwright";
import { AlreadySent } from "../CheckDuplicates/db.js";
import Filter from "../LLM/Filter.js";
import GetJobs from "./JobSearcher.js";

export default async function GetFilteredJobs() {
    let jobs = await GetJobs();
    const initialSize = jobs.length;
    // Open a browser page so we can scrape job application
    const browser = await chromium.launch();
    const page = await browser.newPage();
    // Loop through all the links we got
    for (let i = 0; i < jobs.length; ++i) {
        // Sanity check
        if (jobs[i] == null)
            continue;
        // If we sent this job and saved it in our db, skip it
        if (AlreadySent(jobs[i].id)) {
            console.log(`#${i + 1} Has Been Sent Already`);
            jobs[i] = null;
            continue;   
        }
        console.log("Found New Job!");
        // Scrape the application page
        await page.goto(jobs[i].redirect);
        jobs[i].desc = (await page.innerText('body')).trim();
        // We pass the description to our AI to see if we're qualified for this job based on the google doc
        const goodFit = await Filter(jobs[i])
        if (!goodFit) {
            console.log(`Bad Fit: ${jobs[i].redirect}`);
            jobs[i] = null;
            continue;
        }
        console.log(`Good Fit: ${jobs[i].redirect}`);
    }
    // Remove any jobs we didn't like (Duplicates, Unqualified)
    jobs = jobs.filter(job => job != null);
    if (jobs.length < process.env.MIN_JOBS) {
        //TODO: Figure out how to find more
    }
    // Close the browser to free the memory
    await browser.close();
    console.log(`Found ${jobs.length} Good New Jobs (out of ${initialSize})`);
    // return {
    //    id,
    //    redirect,
    //    company,
    //    title,
    //    desc 
    // }
    return jobs;
}