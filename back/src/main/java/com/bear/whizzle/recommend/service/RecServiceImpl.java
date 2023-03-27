package com.bear.whizzle.recommend.service;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.preference.repository.PreferenceRepository;
import com.bear.whizzle.recommend.PreferenceMapper;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class RecServiceImpl implements RecService{

    private final WhiskyRepository whiskyRepository;
    private final PreferenceRepository preferenceRepository;
    private final CacheManager cacheManager;
    @Value("${app.cache.flavor-key}")
    private String flavorKey;

    /**
     * Min-Max Noramlization 처리 한 Flavor & 선호 가격대 반환
     * @param memberId : 로그인 했다면 해당 id, 비로그인 시 0
     * @param recWhiskyRequestDto : 위스키 추천 요청 DTO
     * @return PreferenceDto : 선호 가격대 & 정규화된 선호 입맛
     * @throws NotFoundException
     * */
    @Override
    @Transactional(readOnly = true)
    public PreferenceDto extractPreference(Long memberId, RecWhiskyRequestDto recWhiskyRequestDto) throws NotFoundException {
        List<Long> whiskies = recWhiskyRequestDto.getWhiskies();
        Flavor flavor=null;
        Integer priceTier = recWhiskyRequestDto.getPriceTier();
        if (whiskies != null) { // whisky random choice
            Random rand = new Random();
            flavor = whiskyRepository.findById(whiskies.get(rand.nextInt(whiskies.size())))
                                     .orElseThrow(() -> new NotFoundException("해당 위스키 데이터가 없습니다."))
                                     .getFlavor();
        } else if (recWhiskyRequestDto.getFlavor() != null) { // use flavor
            flavor = recWhiskyRequestDto.getFlavor();
        } else if (memberId != 0) { // use member's preference
            Preference preference = preferenceRepository.findByMemberId(memberId)
                                             .orElseThrow(() -> new NotFoundException("선호 입맛 데이터가 존재하지 않습니다."));
            flavor = preference.getFlavor();
            priceTier = preference.getPriceTier();
        }
        FlavorSummary flavorSummary = cacheManager.getCache(CacheType.FLAVOR_MINMAX.getCacheName())
                                                  .get(flavorKey, FlavorSummary.class);
        return PreferenceMapper.toPreferenceDto(priceTier, flavor, flavorSummary);
    }

}
