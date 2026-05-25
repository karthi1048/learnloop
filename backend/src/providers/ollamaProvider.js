import ollama from "ollama";
import { AI_MODEL } from "../config/appConfig.js";

export async function generateWithOllama(prompt) {

    const response = await ollama.chat({
        model: AI_MODEL,

        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    return response.message.content;
}