import axios from "axios";

const MODELS = [
    // model check
    "google/gemma-4-26b-a4b-it:free",
    
    // fallback
    "google/gemma-4-31b-it:free",
];

export async function generateWithCloud(prompt) {

    let lastError = null;

    for (const model of MODELS) {
        try {
            console.log(`Trying cloud model: ${model}`);
            const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
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
            }
        );
    
        const content = response.data?.choices?.[0]?.message?.content;
        if (!content || content.trim().length < 5) {
            throw new Error("Empty cloud response.");
        }
    
        console.log(`Success with model: ${model}`);
        return content;
    
        } catch (error) {
            lastError = error;
            console.error(`Cloud model failed: ${model}`, error.response?.data || error.message);    
        };
    }
    throw new Error("Cloud AI is currently busy. Please try again later or use Offline Mode.");
}