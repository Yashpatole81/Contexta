// AI message bubble with confidence and sources
import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AIMessage = ({ message, confidence = 85, sources = [] }) => {
    // Determine confidence color class
    const getConfidenceColor = (conf) => {
        if (conf >= 80) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
        if (conf >= 60) return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
        return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-start mb-6 w-full"
        >
            <div className="group relative">
                {/* Avatar / Icon could go here */}

                <div className="glass-panel text-gray-200 px-6 py-5 rounded-2xl rounded-tl-sm max-w-3xl shadow-glow-sm">
                    {/* Answer text */}
                    <div className="prose prose-invert prose-p:leading-relaxed prose-sm md:prose-base max-w-none mb-4 font-light text-gray-300">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message}
                        </ReactMarkdown>
                    </div>

                    {/* Meta information row */}
                    <div className="flex flex-wrap items-center gap-4 pt-3 mt-1 border-t border-white/5">

                        {/* Confidence Pill */}
                        <div className={clsx(
                            "flex items-center space-x-2 px-2.5 py-1 rounded-full text-xs font-medium border",
                            getConfidenceColor(confidence)
                        )}>
                            <span>
                                {confidence >= 80 ? 'High Confidence' : confidence >= 60 ? 'Medium Confidence' : 'Low Confidence'}
                            </span>
                            <span className="opacity-60">|</span>
                            <span>{confidence}%</span>
                        </div>

                        {/* Sources */}
                        {sources.length > 0 && (
                            <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
                                <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Sources</span>
                                {sources.map((source, index) => (
                                    <span
                                        key={index}
                                        className="text-xs text-gray-400 bg-dark-bg/50 px-2 py-1 rounded hover:bg-dark-bg transition-colors cursor-default border border-white/5 whitespace-nowrap"
                                    >
                                        {source}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AIMessage;
