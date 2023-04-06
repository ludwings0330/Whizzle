import pandas as pd
from common.config import settings


class ItemFeatures:
    __instance = None
    data = None

    def __new__(cls):
        if cls.__instance is None:
            cls.__instance = super().__new__(cls)
        return cls.__instance

    def __init__(self):
        if self.data is None:
            self.load_item_features()

    def load_item_features(self):
        self.data = pd.read_csv(
            settings.ITEM_FEATURES_FILE, index_col=0, encoding=settings.ENCODING
        )
