export const quizPrompt = `
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