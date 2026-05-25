import { useEffect, useState } from 'react'
import { copyToClipboard } from './utils/copyToClipboard'
import { downloadTextFile } from './utils/downloadTextFile';
import { API_BASE_URL, BANNER_TIMEOUT } from './config/appConfig.js';
import { useHealthCheck } from './hooks/useHealthCheck.js';
import { useNetworkStatus } from './hooks/useNetworkStatus.js';
import { useGenerateContent } from './hooks/useGenerateContent.js';
import { useLocalStorage  } from './hooks/useLocalStorage.js';
import LoadingSpinner from './components/LoadingSpinner';
import Card from './components/Card';
import SuccessBanner from './components/SuccessBanner';
import ErrorBanner from './components/ErrorBanner';
import OnBoardingScreen from './components/OnBoardingScreen';
import OfflineSetup from './components/OfflineSetup';
import OnlineSetup from './components/OnlineSetup';
import './App.css'

function App() {
  const [inputText, setInputText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [fileName, setFileName] = useState("");
  const [activeTab, setActiveTab] = useState("summary");

  const isOnline = useNetworkStatus();
  const { backendStatus, ollamaStatus } = useHealthCheck();
  const {
    output, setOutput,
    loading,
    errorMessage, setErrorMessage,
    successMessage, setSuccessMessage,
    lastAction,
    generateContent,  
  } = useGenerateContent();

  const [mode, setMode] = useLocalStorage("learnLoop-mode");
  const [setupComplete, setSetupComplete] = useLocalStorage("learnLoop-offline-setup");
  const [onlineSetupComplete, setOnlineSetupComplete] = useLocalStorage("learnLoop-online-setup");
  
  // Dark mode toggle
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);
  
  // Conditional render for onboard screen
  if (!mode) {
    return (
      <OnBoardingScreen setMode={setMode}/>
    );
  }

  if (mode === "offline" && setupComplete !== "true") {
    return (
      <OfflineSetup setSetupComplete={setSetupComplete}/>
    );
  }
  if (mode === "online" && onlineSetupComplete !== "true") {
    return (
      <OnlineSetup setOnlineSetupComplete={setOnlineSetupComplete}/>
    );
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file) setFileName(file.name)
    
    // utilizes browser's file reader
    const reader = new FileReader();
    reader.onload = (e) => setInputText(e.target.result);
    reader.readAsText(file);    // reading file as a text
  };

  const handleClear = () => {
    setInputText("");
    setOutput(null);
    setErrorMessage("");
    setSuccessMessage("");
    setFileName("");
  }

  return (
    <div className='app'>
      <header>
        <h1>LearnLoop</h1>
        <p>Offline-friendly learning companion powered by Gemma</p>
        <p className='mode'>
          {isOnline ? "Online Mode" : "Offline Mode"}
        </p>
        <p className={`backend-status ${backendStatus}`}>
          Backend: {backendStatus}
        </p>
        <p className={`backend-status ${ollamaStatus}`}>
          Ollama: {ollamaStatus}
        </p>
      </header>
      <main>
        <div className='inputBox'>
          <label htmlFor="file" className="file-upload">
            Choose TXT file only
            <input 
              type="file" name="" id="file"
              accept='.txt'
              onChange={handleFileUpload}
              disabled={loading}
              hidden
            />
            {fileName && (
              <p className="file-name">
                Loaded: {fileName}
              </p>
            )}
          </label>
          <textarea 
            placeholder='Paste your study text here...'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <div className="button-group">
            <button onClick={() => generateContent(inputText, mode)} disabled={loading}>
              {loading ? "Generating" : "Generate"}
            </button>
            {loading && <LoadingSpinner/>}
            <button onClick={handleClear} disabled={loading} className='secondary-btn'>
              Clear
            </button>
            {/* <button disabled>UPLOAD</button> */}
            <button onClick={() => setDarkMode(!darkMode)}>
              Toggle Theme
            </button>
          </div>
        </div>

        {successMessage && (<SuccessBanner message={successMessage}/>)}
        {errorMessage && (
          <ErrorBanner message={errorMessage} onClick={lastAction} disabled={loading}/>
        )}

        <div className="tabs">
          <button onClick={() => setActiveTab("summary")}>
            Summary
          </button>

          <button onClick={() => setActiveTab("quiz")}>
            Quiz
          </button>
        </div>

        <div className='outputBox'>
          {
            output ? (
              <div className="output">
                {activeTab === "summary" && (
                  <Card title="Summary">
                    <p>{output.summary}</p>
                    <button onClick={() =>copyToClipboard(output.summary)}>
                      Copy Summary
                    </button>
                    <button onClick={() => downloadTextFile("summary.txt", output.summary)}>
                      Export Summary
                    </button>
                  </Card>
                )}
                {activeTab === "quiz" && (
                  <Card title="Quiz">
                    <ul className='quiz-list'>
                      {output.quiz.map((question, index) => (
                        <li key={index}>{question}</li>
                      ))}
                    </ul>
                    <button onClick={() =>copyToClipboard(output.quiz.join("\n"))}>
                      Copy Quiz
                    </button>
                    <button onClick={() => downloadTextFile("quiz.txt", output.quiz.join("\n"))}>
                      Export Quiz
                    </button>
                  </Card>
                )}
                {/* <Card title="Flash cards">
                    <div>

                    </div>
                    </Card> */}
              </div>
            ) : (
              <div className="output">
                {activeTab === "summary" && (
                  <Card title="Summary">
                    <p className='empty-state'>
                      AI-generated summary will appear here.
                    </p>
                </Card>
                )}
                {activeTab === "quiz" && (
                  <Card title="Quiz">
                    <p className='empty-state'>
                      Quiz questions will appear here.
                    </p>
                  </Card>
                )}
                {/* <Card title="Flash Cards">
                  <p className='empty-state'>
                    AI-generated flash cards will appear here.
                  </p>
                </Card> */}
              </div>
            )
          }
        </div>
      </main>
      <footer>
        <button disabled={loading} onClick={() => {
          localStorage.removeItem("learnLoop-mode");
          localStorage.removeItem("learnLoop-offline-setup");
          localStorage.removeItem("learnLoop-online-setup");
          window.location.reload();
        }}>
          Change AI mode
        </button>
      </footer>

    </div>
  );
}

export default App;