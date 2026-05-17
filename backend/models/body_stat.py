from sqlalchemy import Column, Float, Date, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid

from database import Base


class BodyStat(Base):
    __tablename__ = "body_stats"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False)
    weight_kg = Column(Float, nullable=True)
    body_fat_pct = Column(Float, nullable=True)
    notes = Column(Text, nullable=True)
    # Apple Health fields (populated when native app is ready)
    sleep_hours = Column(Float, nullable=True)
    resting_hr = Column(Float, nullable=True)
    active_calories = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="body_stats")
