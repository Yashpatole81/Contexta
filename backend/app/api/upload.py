import os
import shutil
import logging
import time
from fastapi import APIRouter, File, UploadFile, HTTPException
from app.schemas.document import DocumentResponse
from app.rag.loader import load_pdf
from app.rag.splitter import split_text
from app.rag.vectorstore import add_documents_to_index

router = APIRouter()
logger = logging.getLogger(__name__)

PDF_STORAGE_PATH = "backend/data/pdfs"

@router.post("/upload-pdf", response_model=DocumentResponse)
async def upload_pdf(file: UploadFile = File(...)):
    """
    Upload a PDF, extract text, chunk it, embed it, and store in FAISS.
    """
    start_time = time.time()
    logger.info(f"Starting upload for file: {file.filename}")

    # Validate file type
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    # Ensure storage directory exists
    os.makedirs(PDF_STORAGE_PATH, exist_ok=True)
    
    file_path = os.path.join(PDF_STORAGE_PATH, file.filename)
    
    # Save file locally
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        logger.info(f"File saved to {file_path} in {time.time() - start_time:.2f}s")
    except Exception as e:
        logger.error(f"Failed to save file: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")
        
    try:
        # RAG Pipeline
        # 1. Load PDF
        t0 = time.time()
        documents = load_pdf(file_path)
        logger.info(f"Loaded {len(documents)} pages in {time.time() - t0:.2f}s")
        
        # 2. Split Text
        t1 = time.time()
        chunks = split_text(documents)
        logger.info(f"Split into {len(chunks)} chunks in {time.time() - t1:.2f}s")
        
        # 3. Embed & Index (Vector Store)
        t2 = time.time()
        logger.info("Starting embedding and indexing (this may take a while on CPU)...")
        add_documents_to_index(chunks)
        logger.info(f"Embedding and indexing completed in {time.time() - t2:.2f}s")
        
        total_time = time.time() - start_time
        logger.info(f"Total processing time for {file.filename}: {total_time:.2f}s")

        return DocumentResponse(
            message=f"Document uploaded and indexed successfully in {total_time:.2f}s",
            filename=file.filename
        )
    except Exception as e:
        logger.error(f"Error processing document: {e}", exc_info=True)
        # In case of error, clean up the file
        if os.path.exists(file_path):
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Failed to process document: {str(e)}")
