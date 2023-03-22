import pickle
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix

import lightfm as LightFM

from models.dto.data_class import Preference


def load_rec_model():
    model = pickle.load(open("./models/save/rec_model.pkl", "rb"))
    return model


def load_item_features():
    item_features = pd.read_csv(
        "./models/save/item_features.csv", index_col=0, encoding="UTF-8"
    )
    return csr_matrix(item_features)


def make_user_features(preference: Preference):
    return csr_matrix([preference.price_tier] + list(vars(preference.flavor).values()))


def predict_personal_whisky(preference: Preference):
    model = load_rec_model()
    user_features = make_user_features(preference)
    item_features = load_item_features()
    item_ids = np.arange(item_features.shape[0])
    scores = model.predict(
        user_ids=preference.user_id,
        item_ids=item_ids,
        item_features=item_features,
        user_features=user_features,
    )
    return np.argsort(-scores).tolist()


def predict_similar_whisky(whisky_id: int, k: int = 5):
    item_features = load_item_features()
    # get Cosine Similarity
    cosine_sim = cosine_similarity(item_features, item_features)

    # get similarity scores
    scores = cosine_sim[whisky_id]

    # sort by similarity
    return np.argsort(-scores)[1: k + 1].tolist()
