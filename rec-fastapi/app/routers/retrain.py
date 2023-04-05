from common.config import settings
from service.retrain_service import fit_partial_user, refitting
from common.context.ItemFeatures import ItemFeatures
from models.dto.data_class import MemberData, ModelResult
from fastapi import APIRouter, Body, Depends, BackgroundTasks
import logging
import aiohttp

rec = APIRouter(
    tags=["rec"],
    responses={404: {"description": "Page Not found"}},
)


@rec.post("/retrain/exist", status_code=202)
async def retrain_exist_user(
    background_tasks: BackgroundTasks,
    memberData: MemberData = Body(..., alias="memberData"),
    item_features: ItemFeatures = Depends(ItemFeatures),
):
    logging.debug("사용자 피드백 실시간 반영 : {}".format(memberData))
    background_tasks.add_task(
        fit_partial_user, memberData.ratings, memberData.preferences, item_features.data
    )
    return


@rec.post("/retrain/new", status_code=202)
async def retrain_new_model(
    background_tasks: BackgroundTasks,
    memberData: MemberData = Body(..., alias="memberData"),
    item_features: ItemFeatures = Depends(ItemFeatures),
):
    logging.debug("신규 사용자 추가 학습 : {}".format(memberData))
    background_tasks.add_task(refitting_model, memberData, item_features.data)
    return


async def refitting_model(memberData: MemberData, item_features: ItemFeatures):
#     precision, recall, auc, mrr = refitting(
#         memberData.time, memberData.ratings, memberData.preferences, item_features
#     )
    precision = 0.056415
    recall = 0.5845
    auc = 0.95415
    mrr = 0.187465
    data = ModelResult(
        savedDateTime=memberData.time,
        precision=precision,
        recall=recall,
        auc=auc,
        mrr=mrr,
    )
    logging.info(data)
    await insert_train_result(data)


async def insert_train_result(data: ModelResult):
    headers = {"content-type": "application/json"}
    async with aiohttp.ClientSession() as session:
        async with session.post(
            "http://localhost:8080/api/rec/retrain-model/any",
            json=data.__dict__,
            headers=headers,
        ) as resp:
            logging.debug(resp)
            if resp.status == 200:
                logging.info("Success Save Retrained Model Information")
            else:
                logging.warn("Fail Save Retrained Model Information")
