Features:
- 0 paid api's
- Automated web scraping + LLM prompting + Email
- sqlite database to prevent duplicate suggestions
- Live resume updates

How to Install:
1. Clone the repo in your desired directory
2. Create a new .env file in the project root based off the .env.example
3. Run <code>npm i</code>
4. Run <code>npm run setup</code>, This makes sure to run it on start up and that the local llm is installed
5. **Optional** Run <code>sudo systemctl start jobfinder</code> and you should see an email in your chosen inbox (Check All Mail and Spam)

How To Configure:
- You can change the prompts used to filter by editing the prompt string in src/LLM/Filter.js
- You can change the prompts used to generate feedback by editing the prompt string in src/LLM/Feedback.js