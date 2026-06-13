// Copyright © Connor deBoer 2026
// This guy uses the Adzuna free api to get a list of cannabis jobs in edmonton
export default async function GetRedirectURLs() {
    // We keep this info safe in an env
    const urlPath = process.env.JOBS_URL;
    const what = process.env.WHAT;

    //TODO: Make the what easy for Ciara to update from the mac
    const url = new URL(urlPath);
    url.searchParams.set("what", what);

    const response = await fetch(url);
    const data = await response.json();
    // data.results is an array of objects that contain a ton of info, 
    // but not complete job descriptions, so we need to send a scrapper after the page
    return data.results.map(job => job.redirect_url);
}