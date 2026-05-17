from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Any

from database import get_db
from models.session import WorkoutSession, ExerciseLog
from models.user import User
from services.current_user import get_current_user

router = APIRouter()


class SetData(BaseModel):
    weight_kg: float | None = None
    reps: int | None = None
    rpe: float | None = None
    completed: bool = True
    notes: str | None = None


class ExerciseLogCreate(BaseModel):
    exercise_id: str
    sets: list[SetData]
    order: str | None = None


class SessionCreate(BaseModel):
    user_program_id: str | None = None
    day_key: str | None = None
    date: date
    notes: str | None = None


class SessionUpdate(BaseModel):
    notes: str | None = None
    exercise_logs: list[ExerciseLogCreate] | None = None


@router.post("/")
def create_session(body: SessionCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    session = WorkoutSession(
        user_id=current_user.id,
        user_program_id=body.user_program_id,
        day_key=body.day_key,
        date=body.date,
        notes=body.notes,
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


@router.get("/")
def list_sessions(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return (
        db.query(WorkoutSession)
        .filter(WorkoutSession.user_id == current_user.id)
        .order_by(WorkoutSession.date.desc())
        .limit(50)
        .all()
    )


@router.get("/{session_id}")
def get_session(session_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    session = db.query(WorkoutSession).filter(
        WorkoutSession.id == session_id,
        WorkoutSession.user_id == current_user.id,
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session


@router.put("/{session_id}/logs")
def upsert_exercise_logs(
    session_id: str,
    logs: list[ExerciseLogCreate],
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    session = db.query(WorkoutSession).filter(
        WorkoutSession.id == session_id,
        WorkoutSession.user_id == current_user.id,
    ).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Replace all logs for this session
    db.query(ExerciseLog).filter(ExerciseLog.session_id == session_id).delete()
    for log in logs:
        db.add(ExerciseLog(
            session_id=session_id,
            exercise_id=log.exercise_id,
            sets=[s.model_dump() for s in log.sets],
            order=log.order,
        ))
    db.commit()
    return {"ok": True}
