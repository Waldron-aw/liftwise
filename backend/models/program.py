from sqlalchemy import Column, String, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from database import Base


class Program(Base):
    """Admin-defined base template — immutable by users."""
    __tablename__ = "programs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    description = Column(Text)
    structure = Column(JSONB, nullable=False)  # full program JSON
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user_programs = relationship("UserProgram", back_populates="base_program")


class UserProgram(Base):
    """User's fork of a base program — can be modified via Claude."""
    __tablename__ = "user_programs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    base_program_id = Column(UUID(as_uuid=True), ForeignKey("programs.id"), nullable=True)
    name = Column(String, nullable=False)
    structure = Column(JSONB, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    modified_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="user_programs")
    base_program = relationship("Program", back_populates="user_programs")
    sessions = relationship("WorkoutSession", back_populates="user_program")


from sqlalchemy import Boolean
