export function normalizeAIError(error) {
    console.error("AI Error:", error.message);
    // NOTE: ? - chaining operator, checks if it available or not available (undefined)
    
    // Axios/OpenRouter gives 429
    if (error.response?.status === 429) {
        const providerMessage = error.response?.data?.error?.metadata?.raw;
        console.error("Provider Rate LImit: ", providerMessage);
        return {
            status: 429,
            type: "RATE_LIMIT",
            message: "Cloud AI is currently busy due to free-tier traffic. Please retry or switch to Offline Mode, if available.",
        };
    }
    // Axios timeout
    if (error.code === "ECONNABORTED" || error.message?.toLowerCase().includes("timeout")) {
        const providerMessage = error.response?.data?.error?.metadata?.raw;
        console.error("Time Limit: ", providerMessage);
        return {
            status: 408,
            type: "TIMEOUT",
            message: "The AI request took long to respond. Please try again.",
        };
    }
    // Ollama/local provider unavailable
    if (error.code === "ECONNREFUSED" || error.message?.toLowerCase().includes("connect")) {
        const providerMessage = error.response?.data?.error?.metadata?.raw;
        console.error("Provider unavailable: ", providerMessage);
        return {
            status: 503,
            type: "PROVIDER_UNAVAILABLE",
            message: "Unable to connect to the AI provider. Please ensure Ollama is running or try Cloud Mode, if available.",
        };
    }
    // Empty/malformed AI response
    if (error.message?.toLowerCase().includes("empty") || error.message?.toLowerCase().includes("invalid")) {
        const providerMessage = error.response?.data?.error?.metadata?.raw;
        console.error("Invalid Response: ", providerMessage);
        return {
            status: 502,
            type: "INVALID_RESPONSE",
            message: "The AI returned an invalid response. Please retry.",
        };
    }
    // Fallback unknown error
    return {
        status: 500,
        type: "UNKNOWN_ERROR",
        message: "Something went wrong while generating the AI response.",
    };
}