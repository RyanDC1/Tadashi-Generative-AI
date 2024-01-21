import { ChatRequest, ChatResponse } from "../models";


export interface IChatService {
    getPromptResponse: (body: ChatRequest) => Promise<ChatResponse>
    getImagePromptResponse: (body: ChatRequest) => Promise<ChatResponse>
}