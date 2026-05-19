import { HiSparkles, HiOutlineDocumentText, HiOutlineBookOpen } from 'react-icons/hi'
import { AiOutlineRobot, AiOutlineFileText } from 'react-icons/ai'
import { BsStars, BsMagic } from 'react-icons/bs'
import { RiRobotLine } from 'react-icons/ri'
import { MdQuiz, MdStyle, MdPsychology } from 'react-icons/md'
import { PiExam, PiCards } from 'react-icons/pi'
import { GiBrain } from 'react-icons/gi'

export default function OnBoardingScreen({ setMode }) {
    
    const chooseMode = (selectedMode) => {
        localStorage.setItem("studyFlow-mode", selectedMode);

        if (selectedMode == "offline") {
            localStorage.setItem("studyFlow-offline-setup", "false");
        };
        setMode(selectedMode);
    }

    return (
        <div className="onboarding">
            {/* <h1>Welcome to StudyFlow</h1> */}
            <h1>
                <HiSparkles/>
                <HiOutlineBookOpen/>
                <HiOutlineDocumentText/>
                <AiOutlineFileText/>
                <AiOutlineRobot/>
                <BsMagic/>
                <BsStars/>
                <RiRobotLine/>
                <MdPsychology/>
                <MdQuiz/>
                <MdStyle/>
                <PiCards/>
                <PiExam/>
                <GiBrain/>
            </h1>
            <p>Choose how you want to use AI.</p>
            <div className="mode-card">
                <h2>Offline Mode</h2>
                <p>Run Gemma AI locally using Ollama.</p>
                <button onClick={() => chooseMode("offline")}>
                    Use Offline Mode
                </button>
            </div>
            <div className="mode-card">
                <h2>Online Mode</h2>
                <p>Use Gemma AI through cloud AI.</p>
                <button onClick={() => chooseMode("online")}>
                        Use Online Mode
                </button>
            </div>
        </div>
    );
}