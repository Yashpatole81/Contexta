import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DocumentUpload = ({ onUpload }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            onUpload(files);
        }
        // Reset input
        e.target.value = '';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            onUpload(files);
        }
    };

    return (
        <div className="relative">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                multiple
                accept=".pdf,.docx,.txt"
            />

            <motion.div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                animate={{
                    borderColor: isDragging ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: isDragging ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                }}
                className={`
                    relative group cursor-pointer border-2 border-dashed rounded-xl p-6
                    transition-colors duration-200 flex flex-col items-center justify-center gap-3
                    hover:border-violet-500/30 hover:bg-white/[0.02]
                `}
            >
                <div className="p-3 bg-dark-surface rounded-full shadow-lg group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                </div>
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                        Click to upload
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        or drag and drop PDF, DOCX, TXT
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default DocumentUpload;
