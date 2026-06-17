// Copyright © Connor deBoer 2026
// This guy uses the Adzuna free api to get a list of jobs in edmonton
export default async function GetJobs() {
    // We keep this info safe in an env
    const urlPath = process.env.ADZUNA_ENDPOINT;
    const what = process.env.WHAT.split(',');

    const urls = [];
    for (let i = 0; i < what.length; ++i) {
        const url = new URL(urlPath);
        url.searchParams.set("what", what[i]);
    
        const response = await fetch(url);
        const data = await response.json();
        // data.results is an array of objects that contain a ton of info, 
        // but not complete job descriptions, so we need to send a scrapper after the page
        urls.push(...data.results.map(job => Object({ 
            id: job.id, 
            redirect: job.redirect_url, 
            company: job.company.display_name,
            title: job.title,
            desc: "",
            feedback: ""
        })));
    }
    return urls;
}