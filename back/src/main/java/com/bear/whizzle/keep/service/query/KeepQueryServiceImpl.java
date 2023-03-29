package com.bear.whizzle.keep.service.query;

import com.bear.whizzle.keep.controller.dto.KeepSearchCondition;
import com.bear.whizzle.keep.repository.KeepRepository;
import com.bear.whizzle.keep.repository.projection.KeepProjectionRepository;
import com.bear.whizzle.whisky.repository.projection.dto.WhiskySimpleResponseDto;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class KeepQueryServiceImpl implements KeepQueryService {

    private final KeepRepository keepRepository;
    private final KeepProjectionRepository keepProjectionRepository;

    @Override
    public Slice<WhiskySimpleResponseDto> findKeptWhiskiesWithMyKeep(Long myId, Pageable pageable, KeepSearchCondition searchCondition) {
        Slice<WhiskySimpleResponseDto> whiskyDtos = keepProjectionRepository.findTopNByMemberIdAndLastOffset(pageable, searchCondition);

        Set<Long> myKeptWhiskies = keepRepository.findAllByMemberId(myId);
        whiskyDtos.forEach(dto -> {
            if (myKeptWhiskies.contains(dto.getId())) {
                dto.keep();
            }
        });

        return whiskyDtos;
    }

    @Override
    public Slice<WhiskySimpleResponseDto> findKeptWhiskiesWithoutMyKeep(Pageable pageable, KeepSearchCondition searchCondition) {
        return keepProjectionRepository.findTopNByMemberIdAndLastOffset(pageable, searchCondition);
    }

}
