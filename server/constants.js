const GENERATIVE_LANGUAGE_CHAT_LEGACY_URL=`https://generativelanguage.googleapis.com/v1beta1/models/chat-bison-001:generateMessage?key=${process.env.PLAM2_API_KEY}`
const GENERATIVE_LANGUAGE_CHAT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.PLAM2_API_KEY}`

module.exports = {
    GENERATIVE_LANGUAGE_CHAT_LEGACY_URL,
    GENERATIVE_LANGUAGE_CHAT_URL
}