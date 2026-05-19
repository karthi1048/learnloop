export function removeDuplicateLines(text) {
    const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

    const uniqueLines = [...new Set(lines)];

    return uniqueLines.join("\n");
}