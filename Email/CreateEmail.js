// Copyright © Connor deBoer 2026

import { chromium } from "playwright";
import GetRedirectURLs from "../Resume/JobBoardConnect.js"
import Filter from "../LLM/Filter.js";
import GetFeedback from "../LLM/Feedback.js";

export default async function GetEmailBody() {
    // Open a browser page so we can scrape job application
    const browser = await chromium.launch();
    const page = await browser.newPage();
    // The URLs we're gonna scrape
    const urls = await GetRedirectURLs();
    // We create a dictionary to populate URL : FEEDBACK
    const jobs = {};
    console.log(`Starting the big process (${urls.length})`)
    for (let i = 0; i < urls.length; ++i) {
        // Get all the text from the page
        await page.goto(urls[i]);
        let job = await page.innerText("body");
        // Use an LLM to compare the current job to the resume, if it's a bad fit skip it
        console.log("Checking job out")
        let goodFit = await Filter(job);
        if (!goodFit) {
            console.log("Skipped a job");
            continue;
        }
        // If we made it this far we should give feedback on this job and add it to our jobs object so we can turn it into an email later
        console.log(`Creating Feedback for ${urls[i]}`)
        let feedback = await GetFeedback(job);
        console.log("Finished Feedback")
        jobs[urls[i]] = feedback;
    }
    // Close the browser to free the memory
    await browser.close();
    console.log("Finished the big process");
    // Returns the url : feedback
    return jobs;
}