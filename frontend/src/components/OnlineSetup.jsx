export default function OnlineSetup({ setOnlineSetupComplete }) {

    const finishSetup = () => {
        localStorage.setItem("studyFlow-online-setup", "true");
        setOnlineSetupComplete("true");
    }

    return (
        <div className="online-setup">
            <h1>Online Mode Setup</h1>
            <p>StudyFlow can also use Cloud AI models for faster setup & improved AI responses.</p>
            {/* Cloud mode */}
            <div className="online-section">
                <h2>What is Online Mode?</h2>
                <p>Online mode connects StudyFlow to Gemma 4 through cloud AI providers.</p>
                <p>This avoids local AI model downloads & is recommended for users who prefer quick setup.</p>
                <p>NOTE: Online mode may have limited daily requests depending on cloud provider usage.</p>
            </div>
            <div className="online-section">
                <h2>Benefits</h2>
                <ul>
                    <li>No Ollama installation needed.</li>
                    <li>Faster setup experience.</li>
                    <li>Access to larger Gemma models.</li>
                    <li>Better AI response quality.</li>
                </ul>
            </div>
            {/* Future API supports */}
            <div className="online-section">
                <h2>Cloud AI support</h2>
                <p>Future versions of StudyFlow will support cloud AI providers for online inference & model selection.</p>
            </div>
            {/* Continue to App */}
            <button className="continue-button" onClick={finishSetup}>
                Continue to StudyFlow
            </button>
        </div>
    )
}