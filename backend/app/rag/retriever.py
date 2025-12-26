from typing import List
from langchain_core.documents import Document
from app.rag.vectorstore import get_vectorstore
import logging

logger = logging.getLogger(__name__)

def get_relevant_documents(query: str, k: int = 5) -> List[Document]:
    """
    Retrieve top-k relevant documents from the vector store.
    """
    logger.info(f"Retrieving documents for query: '{query}' (k={k})")
    vectorstore = get_vectorstore()
    if not vectorstore:
        logger.warning("Vectorstore not found! Returning empty list.")
        return []
    
    retriever = vectorstore.as_retriever(search_kwargs={"k": k})
    docs = retriever.invoke(query)
    logger.info(f"Retrieved {len(docs)} relevant documents.")
    return docs
