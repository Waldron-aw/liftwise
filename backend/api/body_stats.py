from datetime import date
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import get_db
from models.body_stat import BodyStat
from models.user import User
from services.current_user import get_current_user

router = APIRouter()


class BodyStatCreate(BaseModel):
    date: date
    weight_kg: float | None = None
    body_fat_pct: float | None = None
    notes: str | None = None
    sleep_hours: float | None = None
    resting_hr: float | None = None
    active_calories: float | None = None


@router.post("/")
def log_stat(body: BodyStatCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Upsert by date
    stat = db.query(BodyStat).filter(BodyStat.user_id == current_user.id, BodyStat.date == body.date).first()
    if stat:
        for k, v in body.model_dump(exclude_unset=True).items():
            setattr(stat, k, v)
    else:
        stat = BodyStat(user_id=current_user.id, **body.model_dump())
        db.add(stat)
    db.commit()
    db.refresh(stat)
    return stat


@router.get("/")
def list_stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return (
        db.query(BodyStat)
        .filter(BodyStat.user_id == current_user.id)
        .order_by(BodyStat.date.desc())
        .limit(90)
        .all()
    )
