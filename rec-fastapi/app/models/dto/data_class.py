from fastapi import Body
from pydantic import BaseModel
from typing import List
import pandas as pd


class Preference(BaseModel):
    user_id: int = Body(..., alias="memberId")
    price_tier: int = Body(..., alias="priceTier", ge=1, le=5)
    smoky: float = Body(..., ge=0, le=1)
    peaty: float = Body(..., ge=0, le=1)
    spicy: float = Body(..., ge=0, le=1)
    herbal: float = Body(..., ge=0, le=1)
    oily: float = Body(..., ge=0, le=1)
    body: float = Body(..., ge=0, le=1)
    rich: float = Body(..., ge=0, le=1)
    sweet: float = Body(..., ge=0, le=1)
    salty: float = Body(..., ge=0, le=1)
    vanilla: float = Body(..., ge=0, le=1)
    tart: float = Body(..., ge=0, le=1)
    fruity: float = Body(..., ge=0, le=1)
    floral: float = Body(..., ge=0, le=1)


class Rating(BaseModel):
    user_id: int = Body(..., alias="memberId")
    whisky_id: int = Body(..., alias="whiskyId", ge=1)
    rating: int = Body(...)


class PersonalWhiskyRequest(BaseModel):
    user_id: int = Body(..., alias="memberId")
    preferences: List[Preference] = Body(..., alias="preferenceDtoList")


class MemberData(BaseModel):
    time: str = None
    ratings: List[Rating] = Body(..., alias="ratings")
    preferences: List[Preference] = Body(...)


class ModelResult(BaseModel):
    savedDateTime: str
    precision: float
    recall: float
    auc: float
    mrr: float
