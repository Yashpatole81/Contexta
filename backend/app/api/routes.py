from fastapi import APIRouter, File, UploadFile
from app.schemas.question import QuestionRequest, QuestionResponse
from app.schemas.document import DocumentResponse
from app.services import qa_service, document_service

router = APIRouter()

@router.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint to verify backend status.
    """
    return {
        "status": "ok",
        "service": "contexta-backend"
    }

@router.post("/api/ask", response_model=QuestionResponse, tags=["QA"])
async def ask_question(request: QuestionRequest):
    """
    Endpoint to ask a question to the AI.
    Currently returns a mocked response.
    """
    return await qa_service.get_answer(request.question)

@router.post("/api/documents/upload", response_model=DocumentResponse, tags=["Documents"])
async def upload_document(file: UploadFile = File(...)):
    """
    Endpoint to upload a document for indexing.
    Currently mocks the upload process.
    """
    return await document_service.upload_document(file)
