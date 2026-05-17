from sqlalchemy import Column, String, DateTime, ForeignKey, Date, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from database import Base


class WorkoutSession(Base):
    __tablename__ = "workout_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    user_program_id = Column(UUID(as_uuid=True), ForeignKey("user_programs.id"), nullable=True)
    day_key = Column(String)  # e.g. "push_a" — matches key in program structure
    date = Column(Date, nullable=False)
    notes = Column(Text)
    ai_brief = Column(Text)       # pre-session coaching note from Claude
    ai_feedback = Column(Text)    # post-session feedback from Claude
    completed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="sessions")
    user_program = relationship("UserProgram", back_populates="sessions")
    exercise_logs = relationship("ExerciseLog", back_populates="session", cascade="all, delete-orphan")


class ExerciseLog(Base):
    __tablename__ = "exercise_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(UUID(as_uuid=True), ForeignKey("workout_sessions.id"), nullable=False)
    exercise_id = Column(UUID(as_uuid=True), ForeignKey("exercises.id"), nullable=False)
    sets = Column(JSONB, default=[])  # [{weight_kg, reps, rpe, completed, notes}]
    order = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    session = relationship("WorkoutSession", back_populates="exercise_logs")
