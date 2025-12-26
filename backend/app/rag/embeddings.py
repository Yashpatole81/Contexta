from langchain_community.embeddings import HuggingFaceEmbeddings
import logging

logger = logging.getLogger(__name__)

def get_embeddings():
    """
    Get the embedding model.
    Using 'all-MiniLM-L6-v2' via HuggingFaceEmbeddings.
    """
    logger.info("Initializing HuggingFaceEmbeddings (all-MiniLM-L6-v2)...")
    model_name = "sentence-transformers/all-MiniLM-L6-v2"
    model_kwargs = {'device': 'cpu'}
    encode_kwargs = {'normalize_embeddings': False}
    
    embeddings = HuggingFaceEmbeddings(
        model_name=model_name,
        model_kwargs=model_kwargs,
        encode_kwargs=encode_kwargs
    )
    logger.info("Embeddings model initialized.")
    return embeddings
