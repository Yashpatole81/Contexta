// Mock API service for simulating AI responses
const mockResponses = [
    {
        answer: "Contexta is a modern AI-powered knowledge assistant that uses Retrieval-Augmented Generation (RAG) to provide accurate, context-aware answers to your questions.",
        confidence: 92,
        sources: ["Documentation", "System Knowledge"]
    },
    {
        answer: "RAG combines the power of large language models with information retrieval. It first searches a knowledge base for relevant information, then uses that context to generate accurate, grounded answers.",
        confidence: 88,
        sources: ["AI Research", "Technical Papers"]
    },
    {
        answer: "The frontend is built with React and Vite for fast development, styled with Tailwind CSS for a modern dark theme, and designed with Gen-Z aesthetics in mind.",
        confidence: 95,
        sources: ["Project Docs", "Tech Stack"]
    },
    {
        answer: "Currently, the system is in development mode using mocked responses. The backend integration with FastAPI, FAISS embeddings, and LLM will be added in future phases.",
        confidence: 85,
        sources: ["Development Roadmap"]
    }
];

/**
 * Mock API call to simulate AI response
 * @param {string} question - User's question
 * @returns {Promise} - Mocked AI response with delay
 */
export const getMockAIResponse = (question) => {
    return new Promise((resolve) => {
        // Simulate network delay (1-2 seconds)
        const delay = 1000 + Math.random() * 1000;

        setTimeout(() => {
            // Select a random response
            const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

            // Add some variation to confidence
            const confidenceVariation = Math.floor(Math.random() * 10) - 5;
            const adjustedConfidence = Math.max(60, Math.min(99, randomResponse.confidence + confidenceVariation));

            resolve({
                ...randomResponse,
                confidence: adjustedConfidence,
                timestamp: new Date().toISOString()
            });
        }, delay);
    });
};

/**
 * Mock error simulation (for testing error states)
 * @returns {Promise}
 */
export const getMockError = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error("Failed to connect to AI service. Please try again."));
        }, 1000);
    });
};

/**
 * Mock document upload simulation
 * @param {File} file - File object
 * @returns {Promise}
 */
export const uploadDocument = (file) => {
    return new Promise((resolve, reject) => {
        // Validation
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.docx') && !file.name.endsWith('.txt')) {
            setTimeout(() => {
                reject(new Error("Unsupported file type"));
            }, 500);
            return;
        }

        // Simulate upload delay (2-4 seconds)
        const delay = 2000 + Math.random() * 2000;

        setTimeout(() => {
            resolve({
                id: Date.now().toString(),
                name: file.name,
                size: file.size,
                type: file.type,
                status: 'indexed',
                uploadedAt: new Date().toISOString()
            });
        }, delay);
    });
};
