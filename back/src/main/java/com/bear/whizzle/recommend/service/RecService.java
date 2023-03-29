package com.bear.whizzle.recommend.service;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyResponseDto;
import com.bear.whizzle.recommend.controller.dto.SimilarWhiskyResponseDto;
import java.util.List;

public interface RecService {

    PreferenceDto extractPreference(Long memberId, RecWhiskyRequestDto recWhiskyRequestDto) throws NotFoundException;

    List<Long> filterByPriceTier(List<Long> recWhiskies, Integer priceTier);

    List<RecWhiskyResponseDto> findRecWhiskies(List<Long> filteredWhiskies, Long memberId);

    List<SimilarWhiskyResponseDto> findSimWhiskies(List<Long> filteredWhiskies, Long memberId);

}
