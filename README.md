# LearnLoop
<!-- study material processing workflow -->

Offline-friendly AI study assistant powered by React, Express, Ollama, and Gemma4 E2B or Gemma 2B.

## Features

LearnLoop currently supports:

- AI-generated summaries
- AI-generated quiz questions
- TXT file upload support
- Local AI inference using Ollama
- Installable PWA support
- Responsive UI
- Dark mode support
- Export & copy functionality

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express

### AI
- Ollama
- Gemma 2B

## Architecture

LearnLoop uses a simple local AI pipeline:

TXT/Text Input
→ React Frontend
→ Express API
→ Ollama
→ Gemma4 E2B or Gemma 2B
→ Cleaned AI Response
→ Frontend Rendering

## Screenshots

<!-- ### Home Page -->
<!-- ![Home](./screenshots/home.png) -->

<!-- ### Quiz Generation -->
<!-- ![Quiz](./screenshots/quiz.png) -->

## Installation of LearnLoop

### Ollama Setup

LearnLoop uses Gemma locally through Ollama.
Install Ollama and run:

```bash
ollama run gemma:2b
```

### Backend Setup

```bash
cd backend
npm install
node server.js
```
### Environment Variables

Create a `.env` file inside the backend folder:
```env
# port-5000
OLLAMA_MODEL=gemma4:e2b
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### PWA

LearnLoop can be installed as a Progressive Web App (PWA) with offline frontend support.

- Open any browser.
- Find Installable as Web App option.
- Install.

## Future Improvements

Planned future improvements for LearnLoop include:

- PDF upload support
- DOCX upload support
- Flashcards
- Better prompt engineering
- Model experimentation

## Attribution

LearnLoop uses Gemma models through Ollama.

Gemma is a trademark of Google LLC.



# LearnLoop

LearnLoop is an offline-first AI study assistant that transforms study material into concise summaries and quiz questions using Google's Gemma models.

Users can choose between:

* **Offline Mode** — Run Gemma locally using Ollama
* **Online Mode** — Use cloud-hosted Gemma models through OpenRouter

The application is designed as a Progressive Web App (PWA), allowing installation on desktop and mobile devices.

---

## Features

### AI-Powered Learning

* Generate concise study summaries
* Generate quiz questions from study material
* Copy generated content to clipboard
* Export summaries and quizzes as text files

### Dual AI Modes

* Offline Mode using Ollama + Gemma
* Online Mode using OpenRouter-hosted Gemma models

### Progressive Web App

* Installable on desktop
* Installable on mobile
* Offline-capable frontend assets
* App-like experience

### User Experience

* TXT file upload support
* Dark mode support
* Health monitoring for backend and Ollama
* Error handling and retry support
* Success and error notifications

---

## Tech Stack

### Frontend

* React
* Vite
* Vite PWA Plugin

### Backend

* Node.js
* Express

### AI Providers

* Ollama
* OpenRouter
* Google Gemma Models

---

## Project Architecture

Frontend (React + Vite)

↓

Backend API (Express)

↓

Provider Factory

↓

Offline: Ollama + Gemma

OR

Online: OpenRouter + Gemma

---

## Screenshots

### Desktop

(Add desktop screenshot here)

### Mobile

(Add mobile screenshot here)

---

## Local Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd learnloop
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

OLLAMA_MODEL=gemma4:e2b
OLLAMA_BASE_URL=http://127.0.0.1:11434

OPENROUTER_API_KEY=YOUR_KEY

OPENROUTER_URL=https://openrouter.ai/api/v1/chat/completions

REQUEST_TIMEOUT=30000

PRIMARY_CLOUD_MODEL=google/gemma-4-26b-a4b-it:free
FALLBACK_CLOUD_MODEL=google/gemma-4-31b-it:free
```

Start backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

---

## Offline Mode Setup

Install Ollama:

https://ollama.com

Recommended models:

### Lightweight Systems (8GB RAM or lower)

```bash
ollama run gemma:2b
```

### Higher Performance Systems (16GB RAM or higher)

```bash
ollama run gemma4:e2b
```

---

## Deployment

### Frontend

Deployed on Vercel

### Backend

Deployed on Render

---

## Future Improvements

* AI flashcards
* Model selection UI
* Dark mode persistence
* Improved retry UX
* PDF and DOCX support
* User accounts and cloud sync

---

## License

MIT License

---

## Author

Karthi A

Built using React, Node.js, Ollama, OpenRouter, and Google Gemma.


[text](https://learnloop-backend-j66t.onrender.com/)
learnloop-v1.vercel.app