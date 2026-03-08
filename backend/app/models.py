from datetime import datetime, timezone
from sqlalchemy import Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class Technique(Base):
    __tablename__ = "techniques"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    japanese_name: Mapped[str] = mapped_column(String(100), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    subcategory: Mapped[str] = mapped_column(String(50), nullable=False)
    difficulty: Mapped[str] = mapped_column(String(20), nullable=False)
    youtube_video_id: Mapped[str] = mapped_column(String(20), nullable=False)
    start_seconds: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    end_seconds: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    description: Mapped[str] = mapped_column(Text, nullable=False)
    key_points: Mapped[list] = mapped_column(JSONB, nullable=False)


class QuizAttempt(Base):
    __tablename__ = 'quiz_attempts'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    technique_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("techniques.id"), nullable=False
    )
    user_answer: Mapped[str] = mapped_column(String(200), nullable=False)
    is_correct: Mapped[bool] = mapped_column(Boolean, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True),
        nullable=False, default=lambda: datetime.now(timezone.utc),
    )
