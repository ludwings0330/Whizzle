package com.bear.whizzle.badge.service.query;

import com.bear.whizzle.badge.controller.dto.BadgeResponseDto;
import com.bear.whizzle.badge.repository.projection.BadgeProjectionRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BadgeQueryServiceImpl implements BadgeQueryService {

    private final BadgeProjectionRepository badgeProjectionRepository;

    @Override
    public List<BadgeResponseDto> findAllBadgeByMemberId(Long memberId) {
        return badgeProjectionRepository.findAllBadgesByMemberId(memberId);
    }

}
