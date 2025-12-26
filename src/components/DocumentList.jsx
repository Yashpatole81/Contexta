import React from 'react';
import { AnimatePresence } from 'framer-motion';
import DocumentItem from './DocumentItem';

const DocumentList = ({ documents, onDelete }) => {
    return (
        <div className="flex flex-col gap-2 mt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Uploaded Files ({documents.length})
            </h3>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {documents.map((doc) => (
                        <DocumentItem
                            key={doc.id}
                            document={doc}
                            onDelete={onDelete}
                        />
                    ))}
                </AnimatePresence>
                {documents.length === 0 && (
                    <div className="px-4 py-8 text-center border border-white/5 rounded-xl border-dashed">
                        <p className="text-xs text-gray-600">No documents uploaded yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentList;
