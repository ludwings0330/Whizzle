package com.bear.whizzle.badge.service;

import com.bear.whizzle.badge.controller.dto.BadgeResponseDto;
import com.bear.whizzle.domain.model.type.BadgeType;
import java.util.List;

public interface BadgeService {

    List<BadgeResponseDto> findAllBadgeByMemberId(Long memberId);

    void memberAchieveBadge(Long memberId, BadgeType badge);

    void awardBadgeOnReviewCountReached(Long memberId);

    void awardBadgeOnDiaryCountReached(Long memberId);

    void awardBadgeOnKeepCountReached(Long memberId);

    void awardBadgeOnLevelReached(Long memberId);

}
