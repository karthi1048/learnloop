export const AI_MODEL = process.env.OLLAMA_MODEL || "gemma:2b";
export const PORT = Number(process.env.PORT) || 5000;
export const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
export const OPENROUTER_URL = process.env.OPENROUTER_URL || "https://openrouter.ai/api/v1/chat/completions";
export const REQUEST_TIMEOUT = Number(process.env.REQUEST_TIMEOUT) || 30000;
export const PRIMARY_CLOUD_MODEL = process.env.PRIMARY_CLOUD_MODEL || "google/gemma-4-26b-a4b-it:free";
export const FALLBACK_CLOUD_MODEL = process.env.FALLBACK_CLOUD_MODEL || "google/gemma-4-31b-it:free";