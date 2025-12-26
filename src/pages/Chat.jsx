// Chat interface page
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Input from '../components/Input';
import Button from '../components/Button';
import UserMessage from '../components/UserMessage';
import AIMessage from '../components/AIMessage';
import TypingIndicator from '../components/TypingIndicator';
import { sendMessage } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';

const Chat = ({ onBack }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Handle sending a message
    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            type: 'user',
            content: inputValue.trim(),
            id: Date.now()
        };

        // Add user message to chat
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setError(null);

        try {
            // Get AI response from real API
            const response = await sendMessage(userMessage.content);

            const aiMessage = {
                type: 'ai',
                content: response.answer,
                confidence: response.confidence || 0.85,
                sources: response.sources || [],
                id: Date.now() + 1
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            setError(err.message || "Failed to get response");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const suggestedPrompts = [
        "What is the company policy on remote work?",
        "How do I reset my credentials?",
        "Summary of Q3 marketing report"
    ];

    return (
        <div className="flex h-screen bg-dark-bg selection:bg-violet-500/30 overflow-hidden">
            {/* Sidebar - Hidden on mobile, visible on medium+ screens */}
            <div className="hidden md:flex flex-shrink-0">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col relative min-w-0">
                {/* Header - Glassmorphic */}
                <header className="absolute top-0 w-full z-20 px-6 py-4 glass-panel-subtle backdrop-blur-xl border-b border-white/5">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" onClick={onBack} className="!p-2 -ml-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </Button>
                            <div className="flex flex-col">
                                <h1 className="text-lg font-semibold tracking-tight text-white">Contexta</h1>
                                <span className="text-xs text-gray-500 font-medium tracking-wide">AI KNOWLEDGE ASSISTANT</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Chat messages area */}
                <main className="flex-1 overflow-y-auto px-4 md:px-6 pt-24 pb-32 scroll-smooth">
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* Empty state */}
                        <AnimatePresence>
                            {messages.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-glow-md">
                                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-3">
                                        How can I help you today?
                                    </h2>
                                    <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
                                        Ask me anything about your internal documents, policies, or project history.
                                    </p>

                                    {/* Suggested Prompts */}
                                    <div className="flex flex-wrap justify-center gap-3">
                                        {suggestedPrompts.map((prompt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setInputValue(prompt)}
                                                className="px-4 py-2 bg-dark-surface hover:bg-dark-surface-2 border border-white/10 rounded-full text-sm text-gray-400 hover:text-white transition-all duration-200 hover:border-white/20"
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Messages */}
                        <div className="space-y-8">
                            {messages.map((msg) => (
                                msg.type === 'user' ? (
                                    <UserMessage key={msg.id} message={msg.content} />
                                ) : (
                                    <AIMessage
                                        key={msg.id}
                                        message={msg.content}
                                        confidence={msg.confidence}
                                        sources={msg.sources}
                                    />
                                )
                            ))}
                        </div>

                        {/* Loading indicator */}
                        {isLoading && <TypingIndicator />}

                        {/* Error state */}
                        {error && (
                            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div ref={messagesEndRef} className="h-4" />
                    </div>
                </main>

                {/* Input area - fixed at bottom */}
                <footer className="absolute bottom-0 w-full px-4 md:px-6 py-6 z-20 bg-gradient-to-t from-dark-bg via-dark-bg to-transparent pointer-events-none">
                    <div className="max-w-3xl mx-auto pointer-events-auto">
                        <div className="relative flex items-end gap-3 p-1.5 bg-dark-bg/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl ring-1 ring-white/5">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask a follow-up..."
                                className="flex-1 !shadow-none !bg-transparent !border-0 !p-3 focus:!ring-0"
                                disabled={isLoading}
                                autoFocus
                            />
                            <div className="pb-1.5 pr-1.5">
                                <Button
                                    onClick={handleSend}
                                    disabled={isLoading || !inputValue.trim()}
                                    variant="primary"
                                    className="!rounded-xl !px-4 !py-2.5 h-[42px] min-w-[42px]"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </Button>
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <p className="text-[10px] text-gray-600 font-medium uppercase tracking-wider">Contexta AI may produce inaccurate information</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Chat;
