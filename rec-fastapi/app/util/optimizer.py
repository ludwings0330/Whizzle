import optuna

from lightfm import LightFM
from lightfm.evaluation import auc_score

import logging


class Optimizer:
    def __init__(self, interactions, weights, test_interactions, user_feat, item_feat):
        self.interactions = interactions
        self.weights = weights
        self.test_interactions = test_interactions
        self.user_feat = user_feat
        self.item_feat = item_feat

    def objective(self, trial):
        # 조정할 하이퍼 파라미터
        params = {
            "learning_schedule": "adagrad",
            "loss": "warp",
            "random_state": 42,
            "no_components": trial.suggest_int("no_components", 40, 80, 5),
            "learning_rate": trial.suggest_float(
                "learning_rate", 0.001, 0.01, log=True
            ),
            "item_alpha": trial.suggest_float("item_alpha", 0.0001, 0.01, log=True),
            "user_alpha": trial.suggest_float("user_alpha", 0.0001, 0.001, log=True),
        }

        model = LightFM(**params)

        model.fit(
            interactions=self.interactions,
            sample_weight=self.weights,
            user_features=self.user_feat,
            item_features=self.item_feat,
            epochs=5,
            verbose=True,
        )

        test_auc = auc_score(
            model,
            test_interactions=self.test_interactions,
            user_features=self.user_feat,
            item_features=self.item_feat,
        ).mean()
        return test_auc

    def train(self, n_trials):
        study = optuna.create_study(direction="maximize")
        study.optimize(self.objective, n_trials=n_trials)
        return study.best_params
