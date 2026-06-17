// Copyright © Connor deBoer 2026

export default async function Prompt(prompt) {
    // Connects to a free open source llm
    const url = process.env.OLLAMA_ENDPOINT;
    try {
        // Send prompt
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "qwen2.5:14b",
                prompt: prompt,
                stream: false
            })
        });
        // Return output
        const data = await response.json();
        return data.response;
    } catch (error) {
        // If there's an error, try to give me as much as possible
        console.error(`Error\n${error}`);
        return null;
    }
}
