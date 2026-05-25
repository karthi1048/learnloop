import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateQuiz, generateSummary } from "./src/aiService.js";
import { normalizeAIError } from "./src/utils/errorHandler.js";
import { checkOllama } from "./src/utils/checkOllama.js";
import { PORT } from "./src/config/appConfig.js";
// import { parseFlashcards } from "./src/utils/Parser.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Route
app.get("/health", async (req, res) => {
    const ollamaRunning = await checkOllama();
    console.log("Ollama Health:", ollamaRunning);
    res.json({
        status: "ok",
        server: "running",
        ollama: ollamaRunning ? "connected" : "disconnected",
        timestamp: new Date().toISOString(),
    });
});

app.post("/generate", async (req, res) => {
    try {
        const { text, mode } = req.body;
        const start = Date.now();
        
        if (!text || text.trim() === "") {
            return res.status(400).json({
                error: "Text is required",
            });
        }

        const summary = await generateSummary(text, mode);
        const quiz = await generateQuiz(text, mode);
        // NOTE: flashcard is future improvement(not yet implemented.)
        // const flashcard = await generateFlashcards(text);
    
        res.json({
            summary,
            quiz,
            // flashcard,
        });

        const end = Date.now();
        console.log(`Generation took ${end - start}ms`);

    } catch (error) {
        const normalizedError = normalizeAIError(error);
        console.error({
            type: normalizedError.type,
            message: normalizedError.message,
            status: normalizedError.status,
        });

        res.status(normalizedError.status).json({
            type: normalizedError.type,
            message: normalizedError.message,
        });
    }
});

// const data = await generateFlashcards(text);

// const parsed =
//   parseFlashcards(data.flashcards);

// if (!validateFlashcards(parsed)) {
//   throw new Error("Invalid flashcards");
// }

// setFlashcards(parsed);

// const PORT = PORT;

app.listen(PORT, () => {
    console.log(`server running ${PORT}`);
});