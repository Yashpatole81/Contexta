from typing import List, Optional
from pydantic import BaseModel, Field

class QuestionRequest(BaseModel):
    """
    Schema for question ask request.
    """
    question: str = Field(..., min_length=3, description="The question to ask the AI")

class QuestionResponse(BaseModel):
    """
    Schema for AI answer response.
    """
    answer: str
    confidenceScore: float
    sources: List[str]
