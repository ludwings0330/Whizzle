import dill as pickle
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix

from lightfm import LightFM
from lightfm.data import Dataset
from models.dto.data_class import Preference
from common.config import settings


def load_rec_model():
    return pickle.load(open(settings.MODEL_PATH, "rb"))


def load_dataset():
    return pickle.load(open(settings.DATASET_PATH, "rb"))


# memory에 띄워서 관리
# def load_item_features():
#     item_features = pd.read_csv(
#         "./models/save/item_features.csv", index_col=0, encoding="UTF-8"
#     )
#     return csr_matrix(item_features)


def make_source(data):
    source = []
    for row in data.itertuples(index=False):
        meta = {feat: value for feat, value in zip(data.columns[1:], row[1:])}
        source.append((row[0], meta))
    return source


def make_features(preference: Preference, item_features):
    dataset = load_dataset()
    preference = preference.get_preference()
    preference_source = make_source(preference)
    preference_meta = dataset.build_user_features(preference_source, normalize=False)
    item_features = item_features[
        ["whisky_id", "price_tier"] + item_features.columns.tolist()[4:]
    ]
    item_source = make_source(item_features)
    item_meta = dataset.build_item_features(item_source, normalize=False)
    return preference_meta, item_meta


def predict_personal_whisky(preference: Preference, item_features):
    model = load_rec_model()
    user_meta, item_meta = make_features(preference, item_features)
    item_ids = np.arange(item_features.shape[0])
    scores = model.predict(
        user_ids=preference.user_id
        if preference.user_id == 0
        else settings.N_USERS + preference.user_id,
        item_ids=item_ids,
        user_features=user_meta,
        item_features=item_meta,
    )
    return np.argsort(-scores).tolist()


def predict_similar_whisky(whisky_id: int, item_features, k: int = 5):
    # make csr matrix
    item_matrix = csr_matrix(item_features)
    # get Cosine Similarity
    cosine_sim = cosine_similarity(item_matrix, item_matrix)

    # get similarity scores
    scores = cosine_sim[whisky_id]

    # sort by similarity
    return np.argsort(-scores)[1 : k + 1].tolist()
