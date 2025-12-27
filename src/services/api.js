const API_URL = "http://localhost:8080/api";

/**
 * Send a message to the RAG backend.
 * @param {string} question - User's question
 * @returns {Promise<string>} - The full answer text (accumulated from stream)
 */
export const sendMessage = async (question, model) => {
    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question, model }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.detail || `API Error: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        // Handle streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullAnswer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });

            // Check for backend error marker
            if (chunk.includes("[ERROR]:")) {
                const errorMatch = chunk.match(/\[ERROR\]: (.*)/);
                const errorMessage = errorMatch ? errorMatch[1] : "Unknown LLM error";
                throw new Error(errorMessage);
            }

            fullAnswer += chunk;
        }

        return {
            answer: fullAnswer,
            confidence: 90,
            sources: []
        };

    } catch (error) {
        console.error("Chat API Error:", error);
        throw error;
    }
};

/**
 * Upload a document to the backend.
 * @param {File} file - File object
 * @returns {Promise<Object>} - Response data
 */
export const uploadRealDocument = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/documents/upload-pdf`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error(`Upload Failed: ${response.statusText}`);
    }

    return await response.json();
};
