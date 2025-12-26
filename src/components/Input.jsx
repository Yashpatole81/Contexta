// Reusable Input component for chat and forms
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Input = ({ value, onChange, placeholder, className = '', disabled, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`relative group ${className}`}>
            {/* Subtle glow effect behind input */}
            <AnimatePresence>
                {isFocused && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -inset-0.5 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 rounded-xl blur opacity-75 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <input
                type="text"
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                disabled={disabled}
                className={`
                    w-full px-5 py-4 
                    bg-dark-surface/80 backdrop-blur-md 
                    text-gray-100 placeholder-gray-500 
                    rounded-xl border border-white/10 
                    focus:outline-none focus:border-violet-500/30
                    shadow-glass transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
                {...props}
            />
        </div>
    );
};

export default Input;
