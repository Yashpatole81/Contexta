// Typing indicator for AI responses
// Animated typing indicator
import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-1.5 px-4 py-3 bg-dark-surface/50 rounded-2xl w-fit mb-4 border border-white/5"
        >
            <span className="text-xs text-gray-500 mr-2 font-medium">Contexta is thinking</span>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-accent-violet/60 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </motion.div>
    );
};

export default TypingIndicator;
