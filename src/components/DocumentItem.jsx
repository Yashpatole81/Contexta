import React from 'react';
import { motion } from 'framer-motion';

const DocumentItem = ({ document, onDelete }) => {
    const getIcon = () => {
        if (document.name.endsWith('.pdf')) {
            return (
                <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v15a2 2 0 002 2z" />
                </svg>
            );
        }
        if (document.name.endsWith('.docx')) {
            return (
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        }
        return (
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        );
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group flex items-center justify-between p-3 bg-dark-surface border border-white/5 rounded-xl hover:bg-dark-surface-2 transition-colors"
        >
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="shrink-0">
                    {getIcon()}
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-sm text-gray-200 font-medium truncate pr-2" title={document.name}>
                        {document.name}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500 uppercase">{formatSize(document.size)}</span>
                        {document.status === 'uploading' && (
                            <span className="flex items-center gap-1 text-[10px] text-violet-400">
                                <span className="w-1 h-1 bg-violet-400 rounded-full animate-pulse" />
                                Uploading
                            </span>
                        )}
                        {document.status === 'indexed' && (
                            <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                                <span className="w-1 h-1 bg-emerald-400 rounded-full" />
                                Indexed
                            </span>
                        )}
                        {document.status === 'error' && (
                            <span className="flex items-center gap-1 text-[10px] text-rose-400">
                                <span className="w-1 h-1 bg-rose-400 rounded-full" />
                                Failed
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <button
                onClick={() => onDelete(document.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
                title="Remove document"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </motion.div>
    );
};

export default DocumentItem;
