from fastapi import FastAPI
from routes.ingest import router as ingest_router
from routes.health import router as health_router
from routes.embed import router as embed_router
from routes.search import router as search_router
from routes.ask import router as ask_router
from routes.summarize import router as summarize_router

app = FastAPI()

app.include_router(ingest_router)
app.include_router(health_router)
app.include_router(embed_router)
app.include_router(search_router)
app.include_router(ask_router)
app.include_router(summarize_router)