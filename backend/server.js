import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateQuiz, generateSummary} from "./src/aiService.js";
// import { parseFlashcards } from "./src/utils/Parser.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// API Route
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
        // const flashcard = await generateFlashcards(text);
    
        res.json({
            summary,
            quiz,
            // flashcard,
        });

        const end = Date.now();
        console.log(`Generation took ${end - start}ms`);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "AI generation failed",
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

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running ${PORT}`);
});