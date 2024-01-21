import axios from "axios";
import { IChatService } from "./IChatService";
import { ApiRoutes, encryptJSON } from "../utils";

export const ChatService: IChatService = {
    getPromptResponse: async (body) => {
        const response = await axios.post(
            ApiRoutes.chat.generateResponse,
            import.meta.env.DEV ? body : encryptJSON(body),
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )

        return response.data
    },
    getImagePromptResponse: async (body) => {
        const response = await axios.post(
            ApiRoutes.chat.generateImageResponse,
            import.meta.env.DEV ? body : encryptJSON(body),
            {
                headers: {
                    "Content-Type": 'application/json'
                }
            }
        )

        return response.data
    }
}