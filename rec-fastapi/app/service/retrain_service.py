from fastapi import HTTPException
import logging

from typing import List

from lightfm import LightFM
from lightfm.data import Dataset
from models.dto.data_class import Rating, Preference
from util.modelutil import *


def fit_partial_user(ratings: List[Rating], preferences: List[Preference], item_features):
    try:
        model = load_rec_model()
        rating_df = make_rating_df(ratings)
        interactions, weights = make_interactions(rating_df)
        preference_df = make_user_features_df(preferences)
        user_meta, item_meta = make_features(
            preference_df=preference_df, item_features=item_features
        )
        # add error detection logic
        model.fit_partial(
            interactions=interactions,
            sample_weight=weights,
            user_features=user_meta,
            item_features=item_meta,
            epochs=3,
            verbose=False,
        )
        save_model(model)
        save_ratings(rating_df=rating_df)
        save_user_features(user_features_df=preference_df)
    except Exception as e:
        logging.error("기존 사용자 모델 재학습 오류 : {}".format(e.args[0]))
