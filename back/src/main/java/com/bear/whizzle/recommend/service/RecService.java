package com.bear.whizzle.recommend.service;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;

public interface RecService {
    PreferenceDto extractPreference(Long memberId, RecWhiskyRequestDto recWhiskyRequestDto) throws NotFoundException;
}
