import { useEffect, useState } from "react";
import { API_BASE_URL, BANNER_TIMEOUT } from "../config/appConfig.js";

export function useGenerateContent() {
    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [lastAction, setLastAction] = useState(null);

    // Success message auto-removal after 3 seconds
    useEffect(() => {
        if (!successMessage) return;
        const timer = setTimeout(() => {
            setSuccessMessage("");
        }, BANNER_TIMEOUT);
        return () => clearTimeout(timer);
    }, [successMessage]);

    const generateContent = async (inputText, mode) => {
        if (!inputText.trim()) {
            setErrorMessage("Please enter or upload text first.");
            return;
        }

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        setOutput(null);

        // used for retry purpose
        // NOTE: React's state setters treat a function specially
        setLastAction(() => () =>
            generateContent(inputText, mode)
        );

        try {
            const response = await fetch(`${API_BASE_URL}/generate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: inputText,
                        mode,
                    }),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            setOutput(data);
            setSuccessMessage("Generated successfully!");
            setLastAction(null);

        } catch (err) {
            setErrorMessage(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        output,
        setOutput,
        loading,
        errorMessage,
        setErrorMessage,
        successMessage,
        setSuccessMessage,
        lastAction,
        generateContent,
    };
}