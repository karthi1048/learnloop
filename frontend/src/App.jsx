import { useEffect, useState } from 'react'
import { copyToClipboard } from './utils/copyToClipboard'
import { downloadTextFile } from './utils/downloadTextFile';
import LoadingSpinner from './components/LoadingSpinner';
import Card from './components/Card';
import SuccessBanner from './components/SuccessBanner';
import ErrorBanner from './components/ErrorBanner';
import OnBoardingScreen from './components/OnBoardingScreen';
import OfflineSetup from './components/OfflineSetup';
import OnlineSetup from './components/OnlineSetup';
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [activeTab, setActiveTab] = useState("summary");
  const [lastAction, setLastAction] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [ollamaStatus, setOllamaStatus] = useState("checking");
  const [mode, setMode] = useState(
    localStorage.getItem("studyFlow-mode")
  );
  const [setupComplete, setSetupComplete] = useState(
    localStorage.getItem("studyFlow-offline-setup")
  );
  const [onlineSetupComplete, setOnlineSetupComplete] = useState(
    localStorage.getItem("studyFlow-online-setup")
  );
  
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);
  
  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

//  Success message auto-removal after 3 seconds
  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => {
        setSuccessMessage("");
    }, 3000);
    return () => clearTimeout(timer);
}, [successMessage]);

  // Startup health check
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

    } catch(error) {
      console.error("Health Check Failed:", error);
      setBackendStatus("offline");
    }
  };
  checkBackend();
}, []);
  
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

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please enter or upload text first.");
      return;
    };

    setLoading(true);
    setSuccessMessage("");
    setError("");
    setOutput(null);
    setLastAction(() => handleGenerate);

    try {
      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: inputText,
          mode,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      };

      setOutput(data);
      setSuccessMessage("Generated successfully!");
      setLastAction(null);

    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutput(null);
    setError("");
    setSuccessMessage("");
    setFileName("");
    setLastAction(null);
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
            <button onClick={handleGenerate} disabled={loading}>
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
        {error && (
          <ErrorBanner message={error} onClick={lastAction} disabled={loading}/>
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
          localStorage.removeItem("studyFlow-mode");
          localStorage.removeItem("studyFlow-offline-setup");
          localStorage.removeItem("studyFlow-online-setup");
          window.location.reload();
        }}>
          Change AI mode
        </button>
      </footer>

    </div>
  );
}

export default App
