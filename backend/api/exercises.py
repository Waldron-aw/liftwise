from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List

from database import get_db
from models.exercise import Exercise
from services.current_user import get_current_user, require_admin

router = APIRouter()


class ExerciseCreate(BaseModel):
    slug: str
    name: str
    muscle_groups: List[str] = []
    equipment: str | None = None
    movement_type: str | None = None
    demo_url: str | None = None


@router.get("/")
def list_exercises(
    search: str = Query(None),
    muscle_group: str = Query(None),
    equipment: str = Query(None),
    db: Session = Depends(get_db),
    _=Depends(get_current_user),
):
    q = db.query(Exercise)
    if search:
        q = q.filter(Exercise.name.ilike(f"%{search}%"))
    if muscle_group:
        q = q.filter(Exercise.muscle_groups.any(muscle_group))
    if equipment:
        q = q.filter(Exercise.equipment == equipment)
    return q.order_by(Exercise.name).all()


@router.post("/", dependencies=[Depends(require_admin)])
def create_exercise(body: ExerciseCreate, db: Session = Depends(get_db)):
    if db.query(Exercise).filter(Exercise.slug == body.slug).first():
        raise HTTPException(status_code=400, detail="Slug already exists")
    exercise = Exercise(**body.model_dump())
    db.add(exercise)
    db.commit()
    db.refresh(exercise)
    return exercise
