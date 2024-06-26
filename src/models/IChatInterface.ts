export enum ChatActorType {
    AI = 'model',
    USER = 'user'
}

type SafetySettings = {
    category?: 'HARM_CATEGORY_UNSPECIFIED' |
    'HARM_CATEGORY_DEROGATORY' |
    'HARM_CATEGORY_TOXICITY' |
    'HARM_CATEGORY_VIOLENCE' |
    'HARM_CATEGORY_SEXUAL' |
    'HARM_CATEGORY_MEDICAL' |
    'HARM_CATEGORY_DANGEROUS' |
    'HARM_CATEGORY_HARASSMENT' |
    'HARM_CATEGORY_HATE_SPEECH' |
    'HARM_CATEGORY_SEXUALLY_EXPLICIT' |
    'HARM_CATEGORY_DANGEROUS_CONTENT',
    threshold?: 'BLOCK_NONE' |
    'BLOCK_ONLY_HIGH' |
    'BLOCK_MEDIUM_AND_ABOVE' |
    'BLOCK_LOW_AND_ABOVE' |
    'HARM_BLOCK_THRESHOLD_UNSPECIFIED'
}

type ChatContentParts = {
    text: string,
    inline_data?: {
        mime_type: string;
        data: string;
    }
} | {
    text?: string,
    inline_data: {
        mime_type: string;
        data: string;
    }
}

type ChatContent = {
    role: ChatActorType,
    parts: ChatContentParts[]
}

type ChatCandidate = {
    content: ChatContent
    finishReason: string,
    index: number
}

export type ChatRequest = {
    prompt: string,
    images?: string[]
    temperature?: number,
    history?: ChatContent[],
}

export type ChatResponse = {
    candidates: ChatCandidate[]
}

export type DialogType = {
    id: number,
    content: string,
    images?: string[],
    author: ChatActorType,
    date: Date
}

export enum ChatModes {
    Creative = 0.0,
    Balanced = 1.0,
    Precise = 1.8
}