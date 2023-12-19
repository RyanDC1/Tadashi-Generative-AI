export enum ChatActorType {
    AI = '1',
    USER = '0'
}

type ChatContent = {
    author: ChatActorType,
    content: string
}

export type ChatRequest = {
    prompt: string,
    temperature?: number,
    messages?: ChatContent[]
}

export type ChatResponse = {
    candidates: ChatContent[],
    messages: ChatContent[]
}

export type DialogType = {
    id: number,
    content: string,
    author: ChatActorType,
    date: Date
}