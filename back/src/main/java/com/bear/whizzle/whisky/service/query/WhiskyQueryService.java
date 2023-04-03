package com.bear.whizzle.whisky.service.query;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.whisky.controller.dto.WhiskySearchCondition;
import com.bear.whizzle.whisky.repository.projection.dto.WhiskySimpleResponseDto;
import java.util.Map;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface WhiskyQueryService {

    Slice<WhiskySimpleResponseDto> findWhiskiesWithoutKeep(Pageable pageable, WhiskySearchCondition searchCondition);

    Slice<WhiskySimpleResponseDto> findWhiskiesWithKeep(Long memberId, Pageable pageable, WhiskySearchCondition searchCondition);

    Map<Long, Integer> findWhiskyPriceTier();

    Boolean exsistByIdCached(Long whiskyId) throws NotFoundException;

}
