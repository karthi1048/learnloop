export function parseQuiz(text) {
    return text
        .split("\n")
        .filter(line => /^\d+\./.test(line.trim()))
        .map(line =>
            line.replace(/^\d+\.\s*/, "").trim()
        );
}

export function parseFlashcards(text) {
    return text
        .split("\n")
        .filter(line => line.includes(":"))
        .map(line => {
            const [term, ...definition] = line.split(":");

            return {
                term: term.trim(),
                definition: definition.join(":").trim(),
            };
        })
        .filter(card =>
            card.term && card.definition
        );
}