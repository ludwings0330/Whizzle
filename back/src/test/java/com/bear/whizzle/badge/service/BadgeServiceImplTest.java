package com.bear.whizzle.badge.service;

import com.bear.whizzle.badge.controller.dto.BadgeResponseDto;
import com.bear.whizzle.domain.model.entity.Keep;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.Action;
import com.bear.whizzle.keep.repository.KeepRepository;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.review.repository.ReviewRepository;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class BadgeServiceImplTest {

    @Autowired
    private BadgeService badgeService;

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private WhiskyRepository whiskyRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private KeepRepository keepRepository;

    @Test
    @DisplayName("리뷰 갯수에 따른 배지 획득")
    @Transactional
    void memberAchieveReviewBadge() {
        //given
        final Member member = Member.builder()
                                    .provider("google")
                                    .nickname("test")
                                    .email("test@gmail.com")
                                    .build();
        memberRepository.save(member);

        final Whisky whisky = whiskyRepository.getReferenceById(1L);

        this.addReview(member, whisky);

        //when
        badgeService.awardBadgeOnReviewCountReached(member.getId());

        //then
        List<BadgeResponseDto> badges = badgeService.findAllBadgeByMemberId(member.getId());
        Assertions.assertThat(badges).hasSize(1);

        //when 2 - 5 개 작성시
        for (int i = 0; i < 4; i++) {
            addReview(member, whisky);
        }

        badgeService.awardBadgeOnReviewCountReached(member.getId());

        //then 2
        badges = badgeService.findAllBadgeByMemberId(member.getId());
        Assertions.assertThat(badges).hasSize(2);

    }

    @Test
    @DisplayName("Level 에 따른 배지 획득 검증")
    @Transactional
    void memberAchieveLevelBadge() {
        //given
        final Member member = Member.builder()
                                    .provider("google")
                                    .nickname("test")
                                    .email("test@gmail.com")
                                    .build();

        memberRepository.save(member);

        for (int i = 0; i < 200; i++) {
            member.levelUp(Action.REVIEW);
        }

        Assertions.assertThat(member.getLevel()).isEqualTo(50f);

        //when
        badgeService.awardBadgeOnLevelReached(member.getId());

        //then
        List<BadgeResponseDto> badges = badgeService.findAllBadgeByMemberId(member.getId());
        Assertions.assertThat(badges).hasSize(1);

        for (int i = 0; i < 200; i++) {
            member.levelUp(Action.REVIEW);
        }

        badgeService.awardBadgeOnLevelReached(member.getId());

        badges = badgeService.findAllBadgeByMemberId(member.getId());
        Assertions.assertThat(badges).hasSize(2);
    }

    @Test
    @DisplayName("Keep 갯수에 따른 배지 획득")
    @Transactional
    void memberAchieveKeepBadge() {
        //given

        final Member member = Member.builder()
                                    .provider("google")
                                    .nickname("test")
                                    .email("test@gmail.com")
                                    .build();

        memberRepository.save(member);

        //when
        Whisky whisky = whiskyRepository.findById(1L).orElseThrow();

        Keep keep = Keep.builder()
                        .member(member)
                        .whisky(whisky)
                        .build();

        keepRepository.save(keep);

        badgeService.awardBadgeOnKeepCountReached(member.getId());

        List<BadgeResponseDto> badges = badgeService.findAllBadgeByMemberId(member.getId());

        //then
        Assertions.assertThat(badges).hasSize(1);

        for (long i = 2; i <= 10; i++) {
            whisky = whiskyRepository.findById(i).orElseThrow();
            keep = Keep.builder().member(member).whisky(whisky).build();

            keepRepository.save(keep);
        }

        badgeService.awardBadgeOnKeepCountReached(member.getId());

        badges = badgeService.findAllBadgeByMemberId(member.getId());

        Assertions.assertThat(badges).hasSize(2);
    }

    void addReview(Member member, Whisky whisky) {
        final Review review = Review.builder()
                                    .member(member)
                                    .rating(3f)
                                    .content("content")
                                    .whisky(whisky)
                                    .build();

        reviewRepository.save(review);
    }

}