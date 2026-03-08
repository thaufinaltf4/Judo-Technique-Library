from datetime import datetime
from pydantic import BaseModel
from typing import Literal


Difficulty = Literal["beginner", "intermediate", "advanced"]


class TechniqueResponse(BaseModel):
    id: int
    name: str
    japanese_name: str
    category: str
    subcategory: str
    difficulty: Difficulty
    youtube_video_id: str
    start_seconds: int
    end_seconds: int
    description: str
    key_points: list[str]
    model_config = {"from_attributes": True}


class AttemptRequest(BaseModel):
    technique_id: int
    user_answer: str
    is_correct: bool


class AttemptResponse(BaseModel):
    id: int
    technique_id: int
    user_answer: str
    is_correct: bool
    created_at: datetime

    model_config = {"from_attributes": True}

class TechniqueStats(BaseModel):
    technique_id: int
    name: str
    correct: int
    incorrect: int
    total: int
