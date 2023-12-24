const GENERATIVE_LANGUAGE_CHAT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEN_AI_API_KEY}`

const PRE_PROMPT_CONTEXT = JSON.parse(process.env.PRE_PROMPT_CONTEXT ?? '[]')

module.exports = {
    PRE_PROMPT_CONTEXT,
    GENERATIVE_LANGUAGE_CHAT_URL
}