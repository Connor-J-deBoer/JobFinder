// Copyright © Connor deBoer 2026

export default async function GetResumeAsText() {
    const url = process.env.RESUME_URL;
    // Goes to google doc with anyone with a link can view
    const response = await fetch(url);
    // returns the raw text of the google doc, no real formatting
    const text = await response.text();
    return text
}