import axios from "axios";
import { OLLAMA_BASE_URL, REQUEST_TIMEOUT } from "../config/appConfig.js";

export async function checkOllama() {
    try {
        const response = await axios.get(
            `${OLLAMA_BASE_URL}/api/tags`,
            {
                timeout: REQUEST_TIMEOUT,
            }
        );
        return response.status === 200;
    } catch(error) {
        console.error("Ollama Health check Failed", error.message);
        return false;
    }
}