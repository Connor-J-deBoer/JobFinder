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
    console.log(`Starting job hunt ${urls.length}`)
    const jobs = {};
    for (let i = 0; i < urls.length; ++i) {
        await page.goto(urls[i]);
        jobs[urls[i]] = await page.innerText('body');
    }
    // Close the browser to free the memory
    await browser.close();
    console.log(`Scrapped ${urls.length} job posting`)
    for (let i = 0; i < urls.length; ++i) {
        let goodFit = await Filter(jobs[urls[i]]);
        if (!goodFit)
            jobs[urls[i]] = null;
        console.log(`${goodFit ? "Good" : "Bad"} job posting: ${urls[i]}`)
    }
    for (let i = 0; i < urls.length; ++i) {
        let jobPosting = jobs[urls[i]];
        if (jobPosting == null)
            continue;

        console.log(`Starting feedback for ${urls[i]}`)
        jobs[urls[i]] = await GetFeedback(jobPosting);
        console.log("Finished feedback");
    }

    // Returns the url : feedback
    return jobs;
}