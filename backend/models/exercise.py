from sqlalchemy import Column, String, Boolean, DateTime, ARRAY
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
import uuid

from database import Base


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    slug = Column(String, unique=True, nullable=False, index=True)  # e.g. "bench-press"
    name = Column(String, nullable=False)
    muscle_groups = Column(ARRAY(String), default=[])
    equipment = Column(String)  # barbell, dumbbell, bodyweight, machine, cable
    movement_type = Column(String)  # push, pull, hinge, squat, carry, accessory
    demo_url = Column(String, nullable=True)
    is_custom = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
