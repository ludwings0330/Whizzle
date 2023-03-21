package com.bear.whizzle.badge.service;

import com.bear.whizzle.domain.model.type.BadgeType;

public interface BadgeService {

    void memberAchieveBadge(Long memberId, BadgeType badge);

    void awardBadgeOnReviewCountReached(Long memberId);

    void awardBadgeOnDiaryCountReached(Long memberId);

    void awardBadgeOnKeepCountReached(Long memberId);

    void awardBadgeOnLevelReached(Long memberId);

}
