// Reusable Button component
import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) => {
    const variants = {
        primary: 'bg-white text-black hover:bg-gray-200 shadow-glow-sm border-transparent',
        secondary: 'bg-dark-surface text-gray-300 hover:bg-dark-surface-2 border-dark-border hover:border-gray-600',
        glass: 'glass-button text-gray-200',
        ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border-transparent'
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 flex items-center justify-center border',
                variants[variant],
                disabled && 'opacity-50 cursor-not-allowed',
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
