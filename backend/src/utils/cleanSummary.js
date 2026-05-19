export function cleanSummary(text) {
    return text
        .replace(/\*\*/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}
// usage example
// const cleaned = cleanSummary(summary);