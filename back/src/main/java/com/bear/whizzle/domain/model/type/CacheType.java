package com.bear.whizzle.domain.model.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CacheType {

    FLAVOR_MINMAX("flavorMinMax"),
    WHISKY_PRICE_TIER("whiskyPriceTier");

    private final String cacheName;
}
