from fastapi import FastAPI
from app.api import upload, chat
from app.core.config import settings
from app.core.cors import setup_cors
from app.core.logging import setup_logging
from dotenv import load_dotenv

# Load env vars
load_dotenv()

# Setup logging
setup_logging()

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)

# Setup CORS
setup_cors(app)

# Include API Data Routers
app.include_router(upload.router, prefix="/api/documents", tags=["Documents"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])

@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok", "service": "contexta-backend-rag"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8080, reload=True)
