import os
import logging
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.schemas.question import QuestionRequest
from app.rag.retriever import get_relevant_documents
from app.llm.mistral import get_llm
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/chat")
async def chat(request: QuestionRequest):
    """
    Chat endpoint using RAG.
    Retrieves context and streams LLM response.
    """
    try:
        logger.info(f"Received chat request: {request.question}")
        
        # 1. Retrieve Context
        docs = get_relevant_documents(request.question)
        context_text = "\n\n".join([doc.page_content for doc in docs])
        logger.info(f"Context prepared. Length: {len(context_text)} characters.")
        
        # 2. Prepare Prompt
        # Load system prompt
        prompts_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        system_prompt_path = os.path.join(prompts_dir, "prompts", "system.txt")
        
        with open(system_prompt_path, "r") as f:
            system_template = f.read()
            
        prompt = ChatPromptTemplate.from_template(system_template)
        
        # 3. Setup Chain
        llm = get_llm()
        parser = StrOutputParser()
        chain = prompt | llm | parser
        
        # 4. Stream Response
        async def generate():
            async for chunk in chain.astream({
                "context": context_text,
                "question": request.question
            }):
                yield chunk

        # Note: Frontend expects a different format (JSON fields), but for streaming plain text is standard.
        # If the frontend strictly expects structured JSON, we might need Server-Sent Events (SSE) or a different approach.
        # But for "streaming responses to React UI" as requested, StreamingResponse is correct.
        # The React frontend will need to handle the stream.
        
        return StreamingResponse(generate(), media_type="text/plain")

    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))
