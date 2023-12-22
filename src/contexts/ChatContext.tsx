import { createContext, useContext } from "react";

type ChatContextType = {
    prompt: (value: string) => void,
    clearChatHistory: () => Promise<void>
}

const ChatContext = createContext<ChatContextType>(null!)

export const useChatContext = () => {
    return useContext(ChatContext)
}

export default ChatContext.Provider