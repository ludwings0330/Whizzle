package com.bear.whizzle.recommend.service;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;
import java.util.List;

public interface RecService {

    PreferenceDto extractPreference(Long memberId, RecWhiskyRequestDto recWhiskyRequestDto) throws NotFoundException;

    List<Long> filterByPriceTier(List<Long> recWhiskies, Integer priceTier);

    <T> List<T> findRecommendWhiskies(List<Long> whiskies, Long memberId, Class<T> returnType);

    Long isLearnedMember(Long memberId);

}
