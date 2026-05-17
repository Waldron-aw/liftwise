from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Any

from database import get_db
from models.program import Program, UserProgram
from models.user import User
from services.current_user import get_current_user, require_admin

router = APIRouter()


class ProgramCreate(BaseModel):
    name: str
    description: str | None = None
    structure: dict[str, Any]


class AssignProgram(BaseModel):
    user_id: str
    program_id: str


@router.get("/")
def list_programs(db: Session = Depends(get_db), _=Depends(get_current_user)):
    return db.query(Program).order_by(Program.name).all()


@router.post("/", dependencies=[Depends(require_admin)])
def create_program(body: ProgramCreate, db: Session = Depends(get_db), admin=Depends(require_admin)):
    program = Program(name=body.name, description=body.description, structure=body.structure, created_by=admin.id)
    db.add(program)
    db.commit()
    db.refresh(program)
    return program


@router.post("/assign", dependencies=[Depends(require_admin)])
def assign_program(body: AssignProgram, db: Session = Depends(get_db)):
    program = db.query(Program).filter(Program.id == body.program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")

    user_program = UserProgram(
        user_id=body.user_id,
        base_program_id=program.id,
        name=program.name,
        structure=program.structure,
    )
    db.add(user_program)
    db.commit()
    db.refresh(user_program)
    return user_program


@router.get("/my")
def my_programs(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(UserProgram).filter(
        UserProgram.user_id == current_user.id,
        UserProgram.is_active == True,
    ).all()
