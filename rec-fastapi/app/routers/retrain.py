from fastapi import APIRouter, Body, Depends, BackgroundTasks
import logging

from models.dto.data_class import MemberData
from common.context.ItemFeatures import ItemFeatures
from service.retrain_service import fit_partial_user


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

    # @rec.post("/retrain/new", status_code=200)
    # async def retrain_new_model(
    #     whisky_id: int = Path(..., ge=1),
    #     item_features: ItemFeatures = Depends(ItemFeatures),
    # ):
    #     # return predict_similar_whisky(whisky_id, item_features.data)
