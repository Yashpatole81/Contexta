/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#050505', // Ultra deep black
                'dark-bg-secondary': '#0A0A0A', // Slightly lighter
                'dark-surface': '#111111', // Component surface
                'dark-surface-2': '#1C1C1C', // Hover/Secondary surface
                'dark-border': 'rgba(255, 255, 255, 0.06)',
                'dark-border-hover': 'rgba(255, 255, 255, 0.1)',
                'primary-glow': 'rgba(255, 255, 255, 0.03)',
                'accent-violet': '#8B5CF6',
                'accent-violet-glow': 'rgba(139, 92, 246, 0.25)',
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.4s ease-out forwards',
                'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(16px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
                'glow-sm': '0 0 12px rgba(139, 92, 246, 0.15)',
                'glow-md': '0 0 24px rgba(139, 92, 246, 0.2)',
                'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.4)',
                'elevation-2': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                'elevation-3': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                'subtle-grid': 'linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)',
            }
        },
    },
    plugins: [],
    darkMode: 'class',
}
