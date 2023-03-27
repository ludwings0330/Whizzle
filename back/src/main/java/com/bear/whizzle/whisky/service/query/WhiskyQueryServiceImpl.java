package com.bear.whizzle.whisky.service.query;

import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.CacheType;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import com.bear.whizzle.whisky.repository.projection.WhiskyProjectionRepository;
import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class WhiskyQueryServiceImpl implements WhiskyQueryService {

    private final WhiskyProjectionRepository whiskyProjectionRepository;
    private final WhiskyRepository whiskyRepository;
    private final CacheManager cacheManager;
    @Value("${app.cache.flavor-key}")
    private String flavorKey;
    @Value("${app.cache.price-key}")
    private String priceKey;

    @Override
    @Transactional(readOnly = true)
    public FlavorSummary findFlavorMinMax() {
        Cache flavorCache = cacheManager.getCache(CacheType.FLAVOR_MINMAX.getCacheName());
        FlavorSummary summary = flavorCache.get(flavorKey, FlavorSummary.class);
        if (summary == null) {
            flavorCache.put("flavorMinMax", whiskyProjectionRepository.findFlavorMinMax());
        }
        return summary;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<Long, Integer> findWhiskyPriceTier() {
        Cache priceCache = cacheManager.getCache(CacheType.WHISKY_PRICE_TIER.getCacheName());
        Map<Long, Integer> priceTierMap = priceCache.get(priceKey, Map.class);
        if (priceTierMap == null) {
            priceCache.put("whiskyPriceTier", whiskyRepository.findAll()
                                                              .stream()
                                                              .collect(Collectors.toMap(Whisky::getId, Whisky::getPriceTier)));
        }
        return priceTierMap;
    }

}
