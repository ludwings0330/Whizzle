package com.bear.whizzle.badge.service;

import com.bear.whizzle.badge.controller.dto.BadgeResponseDto;
import com.bear.whizzle.badge.repository.BadgeRepository;
import com.bear.whizzle.badge.repository.projection.BadgeProjectionRepository;
import com.bear.whizzle.domain.model.entity.Badge;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.MemberHasBadge;
import com.bear.whizzle.domain.model.entity.MemberHasBadgeRepository;
import com.bear.whizzle.domain.model.type.BadgeType;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.review.service.ReviewService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BadgeServiceImpl implements BadgeService {

    private final BadgeProjectionRepository badgeProjectionRepository;
    private final ReviewService reviewService;
    private final BadgeRepository badgeRepository;
    private final MemberRepository memberRepository;
    private final MemberHasBadgeRepository memberHasBadgeRepository;


    @Override
    public List<BadgeResponseDto> findAllBadgeByMemberId(Long memberId) {
        return badgeProjectionRepository.findAllBadgesByMemberId(memberId);
    }

    @Override
    @Transactional
    public void memberAchieveBadge(Long memberId, BadgeType badgeType) {
        if (badgeType == null) {
            throw new IllegalArgumentException("badgeType cannot be null");
        }

        final Member member = memberRepository.getReferenceById(memberId);
        final Badge badge = badgeRepository.getReferenceById(badgeType.getId());

        final MemberHasBadge achieve = MemberHasBadge.builder()
                                                     .member(member)
                                                     .badge(badge)
                                                     .build();
        // 이미 획득 여부 확인하는 내용 추가?
        memberHasBadgeRepository.save(achieve);
    }

    @Override
    public void awardBadgeOnReviewCountReached(Long memberId) {
        final long reviewCount = reviewService.getReviewCountByMemberId(memberId);
        BadgeType badgeType = null;

        if (reviewCount == 1) {
            badgeType = BadgeType.FIRST_REVIEW;
        } else if (reviewCount == 5) {
            badgeType = BadgeType.FIFTH_REVIEW;
        } else if (reviewCount == 20) {
            badgeType = BadgeType.TWENTIETH_REVIEW;
        }

        if (badgeType != null) {
            this.memberAchieveBadge(memberId, badgeType);
        }
    }

    @Override
    public void awardBadgeOnDiaryCountReached(Long memberId) {

    }

    @Override
    public void awardBadgeOnKeepCountReached(Long memberId) {

    }

    @Override
    public void awardBadgeOnPreferenceSaveCountReached(Long memberId) {

    }

    @Override
    public void awardBadgeOnLevelReached(Long memberId) {

    }

}
