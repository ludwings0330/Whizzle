from fastapi import APIRouter, Body, Path, BackgroundTasks

import time
import random

from service.rec_service import predict_personal_whisky
from models.dto.data_class import Flavor, Preference

rec = APIRouter(
    prefix="/rec",
    tags=["rec"],
    responses={404: {"description": "Page Not found"}},
)


@rec.get("/personal-whisky", status_code=200)
async def rec_personal_whisky(preference: Preference = Body(...)):
    return predict_personal_whisky(preference)
