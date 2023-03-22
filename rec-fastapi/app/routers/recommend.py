from fastapi import APIRouter, Body, Path, BackgroundTasks

import time
import random

from service.rec_service import predict_personal_whisky, predict_similar_whisky
from models.dto.data_class import Preference

rec = APIRouter(
    prefix="/rec",
    tags=["rec"],
    responses={404: {"description": "Page Not found"}},
)


async def retrain_model():
    time.sleep(5)
    print("after sleep")
    if random.randint(0, 1) == 0:
        return "zero"
    else:
        return "one"


@rec.get("/personal-whisky", status_code=200)
async def rec_personal_whisky(preference: Preference = Body(...)):
    return predict_personal_whisky(preference)


@rec.get("/similary-whisky/{whisky_id}", status_code=200)
async def rec_similar_whisky(whisky_id: int = Path(..., ge=0, le=3534)):
    return predict_similar_whisky(whisky_id)


@rec.get("/async/", status_code=202)
async def rec_async(background_tasks: BackgroundTasks):
    a = 100
    print(a)
    return background_tasks.add_task(retrain_model)
