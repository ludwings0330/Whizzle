package com.bear.whizzle.badge.service.query;

import com.bear.whizzle.badge.controller.dto.BadgeResponseDto;
import java.util.List;

public interface BadgeQueryService {

    List<BadgeResponseDto> findAllBadgeByMemberId(Long memberId);

}
