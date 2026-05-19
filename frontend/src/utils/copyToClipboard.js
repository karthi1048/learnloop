export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert("Command copied successfully!");
    } catch (err) {
        console.error(err);
    }
}