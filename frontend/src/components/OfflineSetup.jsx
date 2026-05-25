import { useState } from "react"
import { copyToClipboard } from "../utils/copyToClipboard";

export default function OfflineSetup({ setSetupComplete }) {
    const [systemType, setSystemType] = useState("light");

    const finishSetup = () => {
        localStorage.setItem("learnLoop-offline-setup", "true");
        setSetupComplete("true");
    }

    return (
        <div className="offline-setup">
            {/* NOTE: Need to add icons */}
            <h1>Offline Mode Setup</h1>
            <p>LearnLoop can be run fully offline using Ollama & Gemma models.</p>
            {/* System Selection */}
            <div className="setup-section">
                <h2>Select your System</h2>
                <div className="system-buttons">
                    <button 
                        className={
                            systemType === "light" ? "active-system" : ""
                        }
                        onClick={() => setSystemType("light")}
                    >
                        8GB RAM or Lower
                    </button>
                    <button 
                        className={
                            systemType === "performance" ? "active-system" : ""
                        }
                        onClick={() => setSystemType("performance")}
                    >
                        16GB RAM or Higher
                    </button>
                </div>
            </div>
            {/* Recommended Model */}
            <div className="setup-section">
                <h2>Recommended Models</h2>
                {
                    systemType === "light" ? (
                        <div className="model-card">
                            <h3>Gemma:2b</h3>
                            <p>LightWeight & faster for lower-memory systems.</p>
                            <pre>
                                ollama pull gemma:2b
                                ollama run gemma:2b
                            </pre>
                            <button onClick={() => copyToClipboard("ollama run gemma:2b")}>
                                Copy Command
                            </button>
                        </div>
                    ) : (
                        <div className="model-card">
                            <h3>Gemma4:e2b</h3>
                            <p>Better reasoning & output quality for higher-end systems.</p>
                            <pre>
                                ollama pull gemma4:e2b
                                ollama run gemma4:e2b
                            </pre>
                            <button onClick={() => copyToClipboard("ollama run gemma4:e2b")}>
                                Copy Command
                            </button>
                        </div>
                    )
                }
            </div>
            {/* Install Ollama */}
            <div className="setup-section">
                <h2>Install Ollama</h2>
                <p>Download & install Ollama to run AI models locally.</p>
                <a href="https://ollama.com" target="_blank" rel="noreferrer">
                    Download Ollama
                </a>
            </div>
            {/* Final Step */}
            <div className="setup-section">
                <h2>After Installation</h2>
                <p>Start your backend & frontend in your IDE, then continue to LearnLoop.</p>
                <pre>
                    cd backend
                    npm install
                    node server.js
                </pre>
                <pre>
                    cd frontend
                    npm install
                    npm run dev
                </pre>
            </div>
            {/* Continue to App */}
            <button className="continue-button" onClick={finishSetup}>
                Continue to LearnLoop
            </button>
        </div>
    )
}