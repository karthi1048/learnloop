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