import React, { useState } from 'react';
import DocumentUpload from './DocumentUpload';
import DocumentList from './DocumentList';
import { uploadRealDocument } from '../services/api';

const Sidebar = ({ className = "" }) => {
    const [documents, setDocuments] = useState([]);

    const handleUpload = async (files) => {
        const newDocs = files.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'uploading'
        }));

        setDocuments(prev => [...newDocs, ...prev]);

        // Process uploads
        files.forEach((file, index) => {
            const docId = newDocs[index].id;

            // Call real backend upload
            uploadRealDocument(file)
                .then(uploadedDoc => {
                    setDocuments(prev => prev.map(doc =>
                        doc.id === docId ? { ...doc, status: 'indexed' } : doc
                    ));
                })
                .catch(err => {
                    setDocuments(prev => prev.map(doc =>
                        doc.id === docId ? { ...doc, status: 'error' } : doc
                    ));
                    console.error("Upload failed", err);
                });
        });
    };

    const handleDelete = (id) => {
        setDocuments(prev => prev.filter(doc => doc.id !== id));
    };

    return (
        <aside className={`flex flex-col w-80 h-full border-r border-white/5 bg-dark-bg/50 backdrop-blur-xl ${className}`}>
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-white tracking-wide">Knowledge Base</h2>
                        <p className="text-[10px] text-gray-500 font-medium">Manage your context sources</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                <DocumentUpload onUpload={handleUpload} />
                <DocumentList documents={documents} onDelete={handleDelete} />
            </div>

            <div className="p-4 border-t border-white/5">
                <div className="p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                    <div className="flex items-start gap-3">
                        <svg className="w-4 h-4 text-violet-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-[10px] text-violet-200/80 leading-relaxed">
                            Contexta uses these documents to ground its answers. Supported formats: PDF, DOCX, TXT.
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
