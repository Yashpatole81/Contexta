// User message bubble component
import React from 'react';
import { motion } from 'framer-motion';

const UserMessage = ({ message }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex justify-end mb-6"
        >
            <div className="bg-dark-surface-2 text-gray-100 px-5 py-3.5 rounded-2xl rounded-tr-sm max-w-[85%] md:max-w-2xl shadow-elevation-1 border border-dark-border/50 backdrop-blur-sm">
                <p className="text-sm md:text-[15px] leading-relaxed font-light">{message}</p>
            </div>
        </motion.div>
    );
};

export default UserMessage;
