import os
import logging
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from typing import List, Optional
from app.rag.embeddings import get_embeddings

logger = logging.getLogger(__name__)
INDEX_PATH = "backend/data/faiss_index"

def get_vectorstore() -> Optional[FAISS]:
    """
    Load the FAISS index from disk if it exists.
    """
    embeddings = get_embeddings()
    if os.path.exists(INDEX_PATH) and os.path.exists(f"{INDEX_PATH}/index.faiss"):
        return FAISS.load_local(INDEX_PATH, embeddings, allow_dangerous_deserialization=True)
    return None

def add_documents_to_index(documents: List[Document]):
    """
    Add documents to the FAISS index and save it locally.
    """
    embeddings = get_embeddings()
    
    logger.info(f"Loading/Creating index at {INDEX_PATH}")
    if os.path.exists(INDEX_PATH) and os.path.exists(f"{INDEX_PATH}/index.faiss"):
        vectorstore = FAISS.load_local(INDEX_PATH, embeddings, allow_dangerous_deserialization=True)
        logger.info(f"Adding {len(documents)} documents to existing index...")
        vectorstore.add_documents(documents)
    else:
        logger.info(f"Creating new index with {len(documents)} documents...")
        vectorstore = FAISS.from_documents(documents, embeddings)
    
    vectorstore.save_local(INDEX_PATH)
    logger.info("Index saved locally.")
    return vectorstore
