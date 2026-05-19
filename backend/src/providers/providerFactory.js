import { generateWithOllama } from "./ollamaProvider.js";
import { generateWithCloud } from "./cloudProvider.js";

export function getProvider(mode) {

    if (mode === "online") {
        return generateWithCloud;
    }

    return generateWithOllama;
}