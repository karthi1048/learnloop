import { getProvider } from "./providers/providerFactory.js";

export async function generateSummary(text, mode = "offline") {
    const prompt = `
    You are a study assistant.

    Summarize the following study material into concise & clear bullet points.

    Rules:
    - Keep summary under 3 sentences.
    - Use simple & readable language.
    - Do not add extra commentary.
    - Do not say "Here is the summary".
    - Focus on key concepts only.

    Study Material:
    ${text}
    `;

    const provider = getProvider(mode);
    let summary = await provider(prompt);

    // cleanup & validation
    if (!summary || summary.trim().length < 20) {
        throw new Error("AI generation for summary failed. Please try again.");
    }
    summary = summary.replace(/sure.*summary[:]?/i, "");
    summary = summary.replace(/here.*summary[:]?/i, "");

    return summary.trim();
}

export async function generateQuiz(text, mode = "offline") {
    const prompt = `
    You are a study assistant.

    Generate exactly 5 quiz questions from the study material.

    Rules:
    - No explanations
    - Questions must be short
    - Number the questions
    - Keep questions short
    - Avoid repetition.

    Study Material:
    ${text}
    `;

    const provider = getProvider(mode);
    const summary = await provider(prompt);

    // Post-processing Output
    let content = summary.trim();

    // splits text wherever there is a newline
    const lines = content.split("\n");  // array

    // Keep only numbered questions using Regex
    const questions = lines
        .filter((line) => /^\d+\./.test(line.trim()))       // if true, proceed to map
        .map((line) =>
            line.replace(/^\d+\.\s*/, "").trim()
    );

    if (questions.length === 0) {
        throw new Error("Quiz generation failed. Please try again.");
    }

    return questions;
}


// ways to add the utils in this code

// const rawSummary = data.summary;

// const cleanedSummary =
//   cleanSummary(rawSummary);

// const finalSummary =
//   removeDuplicateLines(cleanedSummary);

// if (!validateSummary(finalSummary)) {
//   throw new Error("Invalid summary");
// }

// setSummary(finalSummary);


// export async function generateFlashcards(text) {
//     const prompt = `
//     You are a study assistant.

//     Generate study flashcards from the following study material.

//     Rules:
//     - Format exactly as:
//     Term: Definition
//     - Keep definitions short & clear.
//     - Focus on important concepts only.
//     - Avoid duplicates.
//     - Do not add extra commentary.
//     - Do not say "Here are the flashcards".

//     Study Material:
//     ${text}
//     `;

//     const response = await ollama.chat({
//         model: "gemma:2b",
//         messages: [
//             {
//                 role: "user",
//                 content: prompt,
//             },
//         ],
//     });

//     // cleanup & validation
//     let flashcards = response.message.content;

//     const parsed = parseFlashcards(flashcards);

//     if (!parsed || flashcards.trim().length < 20) {
//         throw new Error("AI generation for flashcards failed. Please try again.");
//     }

//     flashcards = flashcards.replace(/sure.*flashcards[:]?/i,"");
//     flashcards = flashcards.replace(/here.*flashcards[:]?/i,"");

//     return flashcards.trim();
// }