export const PromptHelpers = [
    '"Tell me a fun fact about space"',
    '"Find a recipe for chocolate chip cookies"',
    '"What is the latest tech news?"',
    '"Translate `ola! como estas?` to English"',
    '"What are some good books to read?"'
]

export const BrowserStoreKeys = {
    THEME: 'TADASHI_THEME_PREF'
}

const chatApiBaseUrl = import.meta.env.VITE_CHAT_API_URL
const API_V1 = '/api/v1'

export const ApiRoutes = {
    chat: {
        generateResponse: `${chatApiBaseUrl}${API_V1}/prompt`
    }
}

export const defaultResponseFallback = "Sorry I didn't quite catch that."
export const defaultAPIFailedDialog = "Sorry, I am having trouble connecting with the server, please try again in some time."