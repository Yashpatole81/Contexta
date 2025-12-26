const API_URL = "http://localhost:8080/api";

/**
 * Send a message to the RAG backend.
 * @param {string} question - User's question
 * @returns {Promise<string>} - The full answer text (accumulated from stream)
 */
export const sendMessage = async (question) => {
    try {
        const response = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        // Handle streaming response
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullAnswer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            fullAnswer += chunk;
            // Note: If we wanted real-time typing effect, we'd accept a callback here
        }

        return {
            answer: fullAnswer,
            confidence: 90, // Backend doesn't return this yet for streaming, defaulting
            sources: [] // Backend streaming text/plain doesn't return metadata easily yet
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
