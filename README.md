# Contexta - AI Knowledge Assistant Frontend

**Ask smarter. Get grounded answers.**

A modern, Gen-Z friendly AI-powered knowledge assistant built with React, Vite, and Tailwind CSS. Features a sleek dark theme, chat-based interface, and beautiful animations.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation & Running

```bash
# Install dependencies (already done)
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5173/** to see the app!

## ✨ Features

### Landing Page
- 💜 Gradient branding text
- 🌙 Dark theme (#0b0b0b black background)
- ✨ Smooth fade-in animations
- 🎨 Decorative blur effects

### Chat Interface
- 💬 ChatGPT-style conversation layout
- 👤 User messages on right (gradient bubble)
- 🤖 AI responses on left with:
  - Confidence indicator (color-coded %)
  - Visual progress bar
  - Source citations
- ⏳ Typing indicator during AI response
- 📜 Auto-scroll to latest messages
- 🎯 Empty, loading, and error states

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx       # Gradient & dark variants
│   ├── Input.jsx        # Dark-themed input
│   ├── TypingIndicator.jsx  # Bouncing dots animation
│   ├── UserMessage.jsx  # Right-aligned bubble
│   └── AIMessage.jsx    # Left-aligned with confidence
├── pages/               # Main views
│   ├── Landing.jsx      # Welcome screen
│   └── Chat.jsx         # Chat interface
├── services/            # API layer
│   └── mockApi.js       # Simulated AI responses
├── App.jsx              # Main app with routing
├── main.jsx             # React entry point
└── index.css            # Global styles & animations
```

## 🎨 Design System

### Colors
- **Background**: `#0b0b0b` (near black)
- **Secondary**: `#111111` (dark charcoal)
- **Accent**: Violet (#8b5cf6) to Blue (#3b82f6) gradient
- **Text**: Off-white (#f3f4f6)
- **Borders**: `rgba(255, 255, 255, 0.1)`

### Animations
- Fade-in for page transitions
- Slide-in-right for user messages
- Slide-in-left for AI messages
- Bounce animation for typing indicator

## 🔧 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite 7.3.0
- **Styling**: Tailwind CSS with `@tailwindcss/postcss`
- **Language**: JavaScript (ES6+)
- **Package Manager**: npm

## 🧪 Mock API

Currently using mocked responses in `src/services/mockApi.js`:
- Random delays (1-2 seconds)
- Multiple pre-defined responses
- Variable confidence scores (60-99%)
- Mock source citations

## 🎯 Current Phase

**Frontend ONLY** - Backend integration coming later.

The app currently:
- ✅ Displays beautiful UI
- ✅ Handles user input
- ✅ Shows mocked AI responses
- ⏳ Awaiting FastAPI backend
- ⏳ Awaiting FAISS + LLM integration

## 🛠️ Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📝 Component Documentation

### `<Button />`
Reusable button with two variants:
- `primary` - Gradient violet-to-blue with shadow
- `secondary` - Dark background with border

### `<Input />`
Dark-themed text input with focus ring and placeholder styling.

### `<AIMessage />`
Displays AI response with:
- `message` - Response text
- `confidence` - Percentage (colors: green 80%+, yellow 60-79%, red <60%)
- `sources` - Array of source labels

### `<UserMessage />`
Right-aligned gradient message bubble for user queries.

### `<TypingIndicator />`
Three bouncing dots to show AI is "thinking".

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.cjs`:
```js
theme: {
  extend: {
    colors: {
      'dark-bg': '#0b0b0b',           // Main background
      'dark-bg-secondary': '#111111',  // Cards & inputs
      'dark-border': 'rgba(255, 255, 255, 0.1)',
    },
  },
}
```

### Adding Mock Responses
Edit `src/services/mockApi.js` - add to `mockResponses` array.

## 🐛 Known Issues

- Minor console warning for `index.css` (doesn't affect functionality)
- Tailwind @apply directives don't work with custom colors in @layer base (resolved by using standard CSS)

## 🔜 Future Enhancements

- [ ] FastAPI backend integration
- [ ] FAISS vector database for RAG
- [ ] LLM integration (OpenAI/Anthropic)
- [ ] User authentication
- [ ] Conversation history persistence
- [ ] Document upload for knowledge base
- [ ] Export chat transcripts

## 📄 License

This project is built for educational/demonstration purposes.

## 👨‍💻 Development Notes

Built with ❤️ using best practices:
- Clean, modular component architecture
- Responsive design (mobile-first)
- Semantic HTML for accessibility
- Production-quality code with comments
- Smooth animations for premium feel

---

**Status**: ✅ Frontend Complete | ⏳ Backend Pending  
**Server**: http://localhost:5173/  
**Last Updated**: December 2025
