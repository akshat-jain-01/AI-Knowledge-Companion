from fastapi import FastAPI
from routes.ingest import router as ingest_router
from routes.health import router as health_router

app = FastAPI()

app.include_router(ingest_router)
app.include_router(health_router)

