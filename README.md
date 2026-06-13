Important:
- You need to install an LLM
- - curl -fsSL https://ollama.com/install.sh | sh
- - ollama pull qwen2.5:14b
- You need to create a .env file with the follow values
- - JOBS_URL (This is the url to adzuna in this case)
- - WHAT (This is a list of search term we wanna look through)
- - RESUME_URL (https://docs.google.com/document/d/GOOGLE_DOC_ID/export?format=txt, where the google doc has anyone can view with link enabled)
- - OLLAMA_URL (The url for the local llm running)
- - RESEND_API_KEY (The api key in the env file)