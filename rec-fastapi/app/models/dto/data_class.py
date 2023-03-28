from fastapi import Body
from pydantic import BaseModel


class Flavor(BaseModel):
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


class Preference(BaseModel):
    user_id: int = Body(..., alias="userId")
    price_tier: int = Body(..., alias="priceTier", ge=1, le=5)
    flavor: Flavor
