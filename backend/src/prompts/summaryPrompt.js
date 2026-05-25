export const summaryPrompt = `
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