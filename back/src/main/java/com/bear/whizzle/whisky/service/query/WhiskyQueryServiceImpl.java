package com.bear.whizzle.whisky.service.query;

import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.CacheType;
import com.bear.whizzle.keep.repository.KeepRepository;
import com.bear.whizzle.whisky.controller.dto.WhiskySearchCondition;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import com.bear.whizzle.whisky.repository.projection.WhiskyProjectionRepository;
import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;
import com.bear.whizzle.whisky.repository.projection.dto.WhiskySimpleResponseDto;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WhiskyQueryServiceImpl implements WhiskyQueryService {

    private final WhiskyRepository whiskyRepository;
    private final WhiskyProjectionRepository whiskyProjectionRepository;
    private final KeepRepository keepRepository;
    private final CacheManager cacheManager;

    @Value("${app.cache.flavor-key}")
    private String flavorKey;

    @Value("${app.cache.price-key}")
    private String priceKey;

    @Override
    public Slice<WhiskySimpleResponseDto> findWhiskiesWithKeep(Long memberId, Pageable pageable, WhiskySearchCondition searchCondition) {
        Slice<WhiskySimpleResponseDto> whiskyDtos = whiskyProjectionRepository.findTopNByWordAndLastOffset(pageable, searchCondition);

        Set<Long> keptWhiskyIds = keepRepository.findAllByMemberId(memberId);
        whiskyDtos.forEach(dto -> {
            if (keptWhiskyIds.contains(dto.getId())) {
                dto.keep();
            }
        });

        return whiskyDtos;
    }

    @Override
    public Slice<WhiskySimpleResponseDto> findWhiskiesWithoutKeep(Pageable pageable, WhiskySearchCondition searchCondition) {
        return whiskyProjectionRepository.findTopNByWordAndLastOffset(pageable, searchCondition);
    }

    @Override
    public FlavorSummary findFlavorMinMax() {
        Cache flavorCache = cacheManager.getCache(CacheType.FLAVOR_MINMAX.getCacheName());
        FlavorSummary summary = flavorCache.get(flavorKey, FlavorSummary.class);
        if (summary == null) {
            summary = whiskyProjectionRepository.findFlavorMinMax();
            flavorCache.put(flavorKey, summary);
        }
        return summary;
    }

    @Override
    public Map<Long, Integer> findWhiskyPriceTier() {
        Cache priceCache = cacheManager.getCache(CacheType.WHISKY_PRICE_TIER.getCacheName());
        Map<Long, Integer> priceTierMap = priceCache.get(priceKey, Map.class);
        if (priceTierMap == null) {
            priceTierMap = whiskyRepository.findAll()
                                           .stream()
                                           .collect(Collectors.toMap(Whisky::getId, Whisky::getPriceTier));
            priceCache.put(priceKey, priceTierMap);
        }
        return priceTierMap;
    }

}
