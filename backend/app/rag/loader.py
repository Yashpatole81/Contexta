from langchain_community.document_loaders import PyPDFLoader
from typing import List
from langchain_core.documents import Document
import logging

logger = logging.getLogger(__name__)

def load_pdf(file_path: str) -> List[Document]:
    """
    Load a PDF file and return a list of documents.
    """
    logger.info(f"Loading PDF from: {file_path}")
    loader = PyPDFLoader(file_path)
    docs = loader.load()
    logger.info(f"PDF loaded successfully. Total pages: {len(docs)}")
    return docs
