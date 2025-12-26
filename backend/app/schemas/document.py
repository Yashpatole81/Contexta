from pydantic import BaseModel

class DocumentResponse(BaseModel):
    """
    Schema for upload document response.
    """
    message: str
    filename: str
