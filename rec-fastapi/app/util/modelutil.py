import logging
import dill as pickle
import pandas as pd

from common.config import settings
from lightfm import LightFM
from lightfm.data import Dataset
from models.dto.data_class import Preference


def load_rec_model():
    return pickle.load(open(settings.MODEL_PATH, "rb"))


def load_dataset():
    return pickle.load(open(settings.DATASET_PATH, "rb"))


def make_rating_df(ratings):
    return pd.DataFrame(
        [
            (rating.user_id + settings.N_USERS, rating.whisky_id, rating.rating)
            for rating in ratings
        ],
        columns=["user_id", "whisky_id", "rating"],
    )


def make_user_features_df(preference):
    preference_df = pd.DataFrame([p.__dict__ for p in preference])
    preference_df["user_id"] = preference_df["user_id"].apply(
        lambda x: x + settings.N_USERS if x != 0 else 0
    )
    return preference_df


def make_source(data):
    source = []
    for row in data.itertuples(index=False):
        meta = {feat: value for feat, value in zip(data.columns[1:], row[1:])}
        source.append((row[0], meta))
    return source


def make_interactions(rating_df):
    dataset = load_dataset()
    # rating_df = make_rating_df(ratings)
    rating_source = list(
        zip(rating_df["user_id"], rating_df["whisky_id"], rating_df["rating"])
    )
    return dataset.build_interactions(rating_source)


def make_features(preference_df, item_features):
    dataset = load_dataset()
    # make user features
    preference_source = make_source(preference_df)
    preference_meta = dataset.build_user_features(
        preference_source, normalize=False)
    # make item features
    item_features = item_features[
        ["whisky_id", "price_tier"] + item_features.columns.tolist()[4:]
    ]
    item_source = make_source(item_features)
    item_meta = dataset.build_item_features(item_source, normalize=False)
    return preference_meta, item_meta


def save_ratings(rating_df):
    logging.debug("train_rating.csv is updated")
    ratings = pd.read_csv(settings.RATING_PATH,
                          index_col=0, encoding=settings.ENCODING)
    ratings = pd.concat([ratings, rating_df], ignore_index=True)
    ratings.drop_duplicates(
        subset=["user_id", "whisky_id"], keep="last", inplace=True)
    ratings.to_csv(settings.RATING_PATH, encoding=settings.ENCODING)


def save_user_features(user_features_df):
    logging.debug("user_features.csv is updated")
    user_features = pd.read_csv(
        settings.USER_FEATURES_PATH, index_col=0, encoding=settings.ENCODING
    )
    user_features = pd.concat(
        [user_features, user_features_df], ignore_index=True)
    user_features.drop_duplicates(
        subset=["user_id"], keep="last", inplace=True)
    user_features.to_csv(settings.USER_FEATURES_PATH,
                         encoding=settings.ENCODING)


def save_model(model, path):
    logging.debug("whizzle_model.pkl is updated")
    with open(path, "wb") as f:
        pickle.dump(model, f)


def save_dataset(dataset, path):
    logging.debug("whizzle_dataset.pkl is updated")
    with open(path, "wb") as f:
        pickle.dump(dataset, f)
