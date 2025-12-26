# Contexta - AI Knowledge Assistant

**Ask smarter. Get grounded answers.**

A modern, Gen-Z friendly AI-powered knowledge assistant built with React, Vite, Tailwind CSS, and FastAPI. Features a sleek dark theme, chat-based interface, and a RAG-capable backend.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.10+
- Virtual environment tool (optional but recommended)

### Installation & Running

#### 1. Backend Setup
The backend is powered by FastAPI and handles document processing and chat logic.

```bash
cd backend

# Create and activate virtual environment (optional)
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server (runs on http://localhost:8080)
python -m app.main
```

#### 2. Environment Configuration
Create a `.env` file in the `backend/` directory to configure the API and keys.

```env
OPENROUTER_API_KEY=your_key_here
OPENROUTER_MODEL=mistralai/mistral-7b-instruct:free
PROJECT_NAME="Contexta Backend"
BACKEND_CORS_ORIGINS=["http://localhost:5173", "http://localhost:3000"]
```

#### 3. Frontend Setup
The frontend is a React SPA that communicates with the backend.

```bash
# Return to root directory
cd ..

# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev
```

Visit **http://localhost:5173/** to see the app!

## ✨ Features

### Frontend
- 💜 **Gradient Branding**: Vibrant, modern aesthetics.
- 🌙 **Dark Theme**: #0b0b0b black background with glassmorphism.
- 💬 **Chat Interface**: ChatGPT-style layout with user/AI bubbles.
- ✨ **Animations**: Smooth fade-ins, typing indicators, and message slides.

### Backend
- ⚡ **FastAPI**: High-performance async python framework.
- 📄 **RAG Pipeline**: Document ingestion and context-aware retrieval (in progress).
- 🧠 **LLM Integration**: Connections to external LLM providers.

## 📁 Project Structure

```
Contexta/
├── backend/             # FastAPI Backend
│   ├── app/
│   │   ├── api/         # Route handlers (chat, upload)
│   │   ├── core/        # Config, CORS, Logging
│   │   └── main.py      # Entry point
│   ├── data/            # Data storage
│   └── requirements.txt # Python dependencies
│
├── src/                 # React Frontend
│   ├── components/      # Reusable UI (Button, Input, Message)
│   ├── pages/           # Main views (Landing, Chat)
│   ├── services/        # API layer
│   ├── App.jsx          # Routing
│   └── main.jsx         # Entry point
│
├── public/              # Static assets
└── README.md            # You are here
```

## 🔧 Tech Stack

**Frontend**
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **Language**: JavaScript (ES6+)

**Backend**
- **Framework**: FastAPI
- **Language**: Python 3.10+
- **Server**: Uvicorn

## 🎨 Design System & Customization

### Colors
- **Background**: `#0b0b0b` (near black)
- **Accent**: Violet (#8b5cf6) to Blue (#3b82f6) gradient
- **Text**: Off-white (#f3f4f6)

### Configuration
- **Frontend**: Edit `tailwind.config.cjs` for theme changes.
- **Backend**: Create a `.env` file in `backend/` for API keys and config.

## 🐛 Known Issues / Roadmap
- [ ] Finalize FAISS vector database integration.
- [ ] Complete LLM provider connections.
- [ ] Add persistent conversation history.

## 📄 License
This project is built for educational/demonstration purposes.
