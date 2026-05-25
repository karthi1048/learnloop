import axios from "axios";
import { OPENROUTER_URL, PRIMARY_CLOUD_MODEL, FALLBACK_CLOUD_MODEL, REQUEST_TIMEOUT } from "../config/appConfig.js";

const MODELS = [ PRIMARY_CLOUD_MODEL, FALLBACK_CLOUD_MODEL ];

export async function generateWithCloud(prompt) {

    let lastError = null; // to store retrieved error

    for (const model of MODELS) {
        try {
            console.log(`Trying cloud model: ${model}`);
            const response = await axios.post(OPENROUTER_URL, {
                model,
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                timeout: REQUEST_TIMEOUT,     // Timeout Protection
            }
        );
    
        const content = response.data?.choices?.[0]?.message?.content;
        // Validation
        if (!content || content.trim().length < 5) {
            throw new Error("Empty cloud response.");
        }
    
        console.log(`Success with model: ${model}`);
        return content;
    
        } catch (error) {
            lastError = error;
            console.error(`Cloud model failed: ${model}`, error.response?.data || error.message);    
        };

        // Continue to next Fallback model
    }
    // preserve original provider error
    throw lastError;
}