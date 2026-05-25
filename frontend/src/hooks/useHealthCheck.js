import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/appConfig.js";

export function useHealthCheck() {
    const [backendStatus, setBackendStatus] = useState("checking");
    const [ollamaStatus, setOllamaStatus] = useState("checking");

    useEffect(() => {
        const checkBackend = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/health`);
                if (!response.ok) {
                    throw new Error();
                }
                const data = await response.json();
                console.log("Health Check:", data);
                setBackendStatus("online");
                setOllamaStatus(data.ollama === "connected" ? "online" : "offline");

            } catch (error) {
                console.error("Health Check Failed:",error);
                setBackendStatus("offline");
                setOllamaStatus("offline");
            }
        };

        checkBackend();
    }, []);

    return {
        backendStatus, 
        ollamaStatus,
    };
}