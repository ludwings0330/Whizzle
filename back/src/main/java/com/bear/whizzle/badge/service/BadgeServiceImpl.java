package com.bear.whizzle.badge.service;

import com.bear.whizzle.badge.repository.BadgeRepository;
import com.bear.whizzle.badge.repository.MemberHasBadgeRepository;
import com.bear.whizzle.diary.service.DiaryService;
import com.bear.whizzle.domain.model.entity.Badge;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.MemberHasBadge;
import com.bear.whizzle.domain.model.type.BadgeType;
import com.bear.whizzle.keep.service.KeepService;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BadgeServiceImpl implements BadgeService {

    private final ReviewService reviewService;
    private final BadgeRepository badgeRepository;
    private final MemberRepository memberRepository;
    private final KeepService keepService;
    private final MemberHasBadgeRepository memberHasBadgeRepository;

    private final DiaryService diaryService;


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
    @Transactional
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
    @Transactional
    public void awardBadgeOnDiaryCountReached(Long memberId) {
        final long diaryCount = diaryService.getDiaryCountByMemberId(memberId);
        BadgeType badgeType = null;

        if (diaryCount == 1) {
            badgeType = BadgeType.FIRST_DIARY;
        } else if (diaryCount == 5) {
            badgeType = BadgeType.FIFTH_DIARY;
        } else if (diaryCount == 20) {
            badgeType = BadgeType.TWENTIETH_DIARY;
        }

        if (badgeType != null) {
            this.memberAchieveBadge(memberId, badgeType);
        }
    }

    @Override
    @Transactional
    public void awardBadgeOnKeepCountReached(Long memberId) {
        final long keepCount = keepService.getKeepCountByMemberId(memberId);
        BadgeType badgeType = null;

        if (keepCount == 1) {
            badgeType = BadgeType.FIRST_KEEP;
        } else if (keepCount == 10) {
            badgeType = BadgeType.TENTH_KEEP;
        }

        if (badgeType != null) {
            this.memberAchieveBadge(memberId, badgeType);
        }
    }

    @Override
    @Transactional
    public void awardBadgeOnLevelReached(Long memberId) {
        final Member member = memberRepository.findById(memberId)
                                              .orElseThrow();
        final Float level = member.getLevel();
        BadgeType badgeType = null;

        if (level == 50) {
            badgeType = BadgeType.LEVEL_50;
        } else if (level == 60) {
            badgeType = BadgeType.LEVEL_60;
        }

        if (badgeType != null) {
            this.memberAchieveBadge(memberId, badgeType);
        }

    }

}
