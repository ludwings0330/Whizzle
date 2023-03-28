package com.bear.whizzle.keep.service.query;

import com.bear.whizzle.keep.controller.dto.KeepSearchCondition;
import com.bear.whizzle.whisky.repository.projection.dto.WhiskySimpleResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface KeepQueryService {

    Slice<WhiskySimpleResponseDto> findKeptWhiskiesWithMyKeep(Long myId, Pageable pageable, KeepSearchCondition searchCondition);

    Slice<WhiskySimpleResponseDto> findKeptWhiskiesWithoutMyKeep(Pageable pageable, KeepSearchCondition searchCondition);

}
