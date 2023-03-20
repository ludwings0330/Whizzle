package com.bear.whizzle.badge.service;

import com.bear.whizzle.badge.controller.dto.BadgeResponseDto;
import java.util.List;

public interface BadgeService {

    List<BadgeResponseDto> findAllBadgeByMemberId(Long memberId);

    void memberAchieveBadge(Long memberId, Long badgeId);

}
