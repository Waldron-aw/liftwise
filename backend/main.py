from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import auth, users, programs, exercises, sessions, body_stats
from database import engine, Base

app = FastAPI(title="Liftwise API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(programs.router, prefix="/programs", tags=["programs"])
app.include_router(exercises.router, prefix="/exercises", tags=["exercises"])
app.include_router(sessions.router, prefix="/sessions", tags=["sessions"])
app.include_router(body_stats.router, prefix="/body-stats", tags=["body-stats"])


@app.get("/health")
def health():
    return {"status": "ok"}
