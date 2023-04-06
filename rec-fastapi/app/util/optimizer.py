import optuna

from lightfm import LightFM
from lightfm.evaluation import auc_score

import logging

# from hyperopt import fmin, hp, tpe, Trials


def objective(
    trial, train_interactions, train_weights, test_interactions, user_meta, item_meta
):

    # 조정할 하이퍼 파라미터
    params = {
        "learning_schedule": "adagrad",
        "loss": "warp",
        "random_state": 42,
        "no_components": trial.suggest_int("no_components", 40, 80, 5),
        "learning_rate": trial.suggest_float("learning_rate", 0.001, 0.01, log=True),
        "item_alpha": trial.suggest_float("item_alpha", 0.0001, 0.01, log=True),
        "user_alpha": trial.suggest_float("user_alpha", 0.0001, 0.001, log=True),
    }

    model = LightFM(**params)

    model.fit(
        interactions=train_interactions,
        sample_weight=train_weights,
        user_features=user_meta,
        item_features=item_meta,
        epochs=5,
        verbose=True,
    )

    test_auc = auc_score(
        model,
        test_interactions=test_interactions,
        item_features=item_meta,
        user_features=user_meta,
    ).mean()

    # logging("no_comp: {}, lrn_rate: {:.5f}, item_alpha: {:.5f}, user_alpha: {:.5f}, MRR: {:.8f}, auc_score: {:.8f}".format(
    #     params["no_components"], params["learning_rate"], params["item_alpha"], params["user_alpha"], test_mrr, test_auc))
    return test_auc


def optimize():
    study = optuna.create_study(direction="maximize")
    study.optimize(objective, n_trials=15)
    return study.best_params
