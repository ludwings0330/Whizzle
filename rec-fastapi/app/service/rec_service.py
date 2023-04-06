from typing import List

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix

import logging

from lightfm import LightFM
from lightfm.data import Dataset

from models.dto.data_class import Preference
from common.config import settings
from util.modelutil import (
    load_rec_model,
    load_dataset,
    make_features,
    make_user_features_df,
)


def predict_personal_whisky(preferences: List[Preference], item_features):
    model = load_rec_model()
    dataset = load_dataset()
    preference_df = make_user_features_df(preferences)
    user_meta, item_meta = make_features(preference_df, item_features, dataset)
    item_ids = np.arange(item_features.shape[0])
    scores = model.predict(
        user_ids=preferences[0].user_id
        if preferences[0].user_id == 0
        else settings.N_USERS + preferences[0].user_id,
        item_ids=item_ids,
        user_features=user_meta,
        item_features=item_meta,
    )
    return np.argsort(-scores).tolist()


def predict_similar_whisky(whisky_id: int, item_features, k: int = 5):
    item_feat = item_features[item_features.columns.tolist()[1:]]
    # make csr matrix
    item_matrix = csr_matrix(item_feat)
    # get Cosine Similarity
    cosine_sim = cosine_similarity(item_matrix, item_matrix)

    # get similarity scores
    scores = cosine_sim[whisky_id]

    # sort by similarity
    logging.debug(
        "whisky id : {} result index : {}".format(
            whisky_id, np.argsort(-scores)[1 : k + 1].tolist()
        )
    )
    return np.argsort(-scores)[1 : k + 1].tolist()
