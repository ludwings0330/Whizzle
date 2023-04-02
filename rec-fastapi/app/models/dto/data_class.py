from fastapi import Body
from pydantic import BaseModel
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
    cols: list = [
        "user_id",
        "price_tier",
        "smoky",
        "peaty",
        "spicy",
        "herbal",
        "oily",
        "body",
        "rich",
        "sweet",
        "salty",
        "vanilla",
        "tart",
        "fruity",
        "floral",
    ]

    def get_preference(self):
        return pd.DataFrame(
            [
                [
                    self.user_id,
                    self.price_tier,
                    self.smoky,
                    self.peaty,
                    self.spicy,
                    self.herbal,
                    self.oily,
                    self.body,
                    self.rich,
                    self.sweet,
                    self.salty,
                    self.vanilla,
                    self.tart,
                    self.fruity,
                    self.floral,
                ]
            ],
            columns=self.cols,
        )
