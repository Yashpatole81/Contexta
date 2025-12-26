from langchain_text_splitters import RecursiveCharacterTextSplitter
from typing import List
from langchain_core.documents import Document
import logging

logger = logging.getLogger(__name__)

def split_text(documents: List[Document], chunk_size: int = 800, chunk_overlap: int = 100) -> List[Document]:
    """
    Split documents into chunks.
    """
    logger.info(f"Splitting {len(documents)} documents with chunk_size={chunk_size}, overlap={chunk_overlap}")
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        is_separator_regex=False,
    )
    chunks = text_splitter.split_documents(documents)
    logger.info(f"Splitting complete. Generated {len(chunks)} chunks.")
    return chunks
