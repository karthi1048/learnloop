export function cleanSummary(text) {
    return text
        .replace(/\*\*/g, "")
        .replace(/\n{3,}/g, "\n\n")
        .trim();
}

// NOTE: Removes markdown bold markers, Collapses excessive blank lines, Trims whitespace.

// usage example
// const cleaned = cleanSummary(summary);