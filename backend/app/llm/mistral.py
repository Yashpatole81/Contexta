import os
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

def get_llm(model_name: str = None):
    """
    Get the LLM client (Mistral/others via OpenRouter).
    """
    api_key = os.getenv("OPENROUTER_API_KEY")
    # Priority: 1. model_name arg, 2. env var, 3. default
    model = model_name or os.getenv("OPENROUTER_MODEL", "mistralai/devstral-2-2512")
    
    if not api_key:
        raise ValueError("OPENROUTER_API_KEY not found in environment variables")
        
    return ChatOpenAI(
        model=model,
        openai_api_key=api_key,
        openai_api_base="https://openrouter.ai/api/v1",
        temperature=0.2,
        max_tokens=1024,
        streaming=True
    )
