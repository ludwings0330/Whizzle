import pickle
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix

import lightfm as LightFM

from models.dto.data_class import Preference
from common.config import settings


def load_rec_model():
    model = pickle.load(open(settings.MODEL_PATH, "rb"))
    return model


# memory에 띄워서 관리
# def load_item_features():
#     item_features = pd.read_csv(
#         "./models/save/item_features.csv", index_col=0, encoding="UTF-8"
#     )
#     return csr_matrix(item_features)


def make_user_features(preference: Preference):
    # user_feature load
    user_features = pd.read_csv(
        settings.USER_FEATURES_PATH, index_col=0, encoding=settings.ENCODING
    )
    return csr_matrix(user_features)
    # my_features = [preference.price_tier] + list(vars(preference.flavor).values())
    # if preference.user_id == 0:
    #     return csr_matrix(my_features)
    # else:
    #     user_features = pd.read_csv(
    #         settings.USER_FEATURES_PATH, index_col=0, encoding=settings.ENCODING
    #     )
    #     user_id = settings.N_USERS + preference.user_id
    #     user_features.iloc[user_id] = my_features
    #     return csr_matrix(user_features)


def predict_personal_whisky(preference: Preference, item_features):
    model = load_rec_model()
    user_features = make_user_features(preference)
    item_ids = np.arange(item_features.shape[0])
    scores = model.predict(
        user_ids=preference.user_id
        if preference.user_id == 0
        else settings.N_USERS + preference.user_id,
        item_ids=item_ids,
        item_features=item_features,
        user_features=user_features,
    )
    return np.argsort(-scores).tolist()


def predict_similar_whisky(whisky_id: int, item_features, k: int = 5):
    # get Cosine Similarity
    cosine_sim = cosine_similarity(item_features, item_features)

    # get similarity scores
    scores = cosine_sim[whisky_id]

    # sort by similarity
    return np.argsort(-scores)[1 : k + 1].tolist()
