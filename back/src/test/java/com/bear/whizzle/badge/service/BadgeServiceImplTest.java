package com.bear.whizzle.badge.service;

import com.bear.whizzle.badge.repository.MemberHasBadgeRepository;
import com.bear.whizzle.diary.repository.DiaryRepository;
import com.bear.whizzle.domain.model.entity.Badge;
import com.bear.whizzle.domain.model.entity.Diary;
import com.bear.whizzle.domain.model.entity.Keep;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.Action;
import com.bear.whizzle.domain.model.type.BadgeType;
import com.bear.whizzle.domain.model.type.DrinkLevel;
import com.bear.whizzle.domain.model.type.Emotion;
import com.bear.whizzle.keep.repository.KeepRepository;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.review.repository.ReviewRepository;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import java.time.LocalDate;
import java.util.Optional;
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
    @Autowired
    private DiaryRepository diaryRepository;
    @Autowired
    private MemberHasBadgeRepository memberHasBadgeRepository;

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
        Optional<Badge> badge = memberHasBadgeRepository.findByMemberIdAndBadgeId(member.getId(), BadgeType.FIRST_REVIEW.getId());
        Assertions.assertThat(badge).isPresent();

        //when 2 - 5 개 작성시
        for (int i = 0; i < 4; i++) {
            addReview(member, whisky);
        }

        badgeService.awardBadgeOnReviewCountReached(member.getId());

        //then 2
        badge = memberHasBadgeRepository.findByMemberIdAndBadgeId(member.getId(), BadgeType.FIFTH_REVIEW.getId());
        Assertions.assertThat(badge).isPresent();

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
        Optional<Badge> badge = memberHasBadgeRepository.findByMemberIdAndBadgeId(member.getId(), BadgeType.LEVEL_50.getId());
        Assertions.assertThat(badge).isPresent();

        for (int i = 0; i < 200; i++) {
            member.levelUp(Action.REVIEW);
        }

        badgeService.awardBadgeOnLevelReached(member.getId());

        badge = memberHasBadgeRepository.findByMemberIdAndBadgeId(member.getId(), BadgeType.LEVEL_60.getId());
        Assertions.assertThat(badge).isPresent();
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

        //then
        Optional<Badge> badge = memberHasBadgeRepository.findByMemberIdAndBadgeId(member.getId(), BadgeType.FIRST_KEEP.getId());
        Assertions.assertThat(badge).isPresent();

        //when
        for (long i = 2; i <= 10; i++) {
            whisky = whiskyRepository.findById(i).orElseThrow();
            keep = Keep.builder().member(member).whisky(whisky).build();

            keepRepository.save(keep);
        }

        badgeService.awardBadgeOnKeepCountReached(member.getId());

        //then
        badge = memberHasBadgeRepository.findByMemberIdAndBadgeId(member.getId(), BadgeType.TENTH_KEEP.getId());
        Assertions.assertThat(badge).isPresent();
    }

    @Test
    @DisplayName("다이어리 작성에 따른 배지 획득 검증")
    @Transactional
    void memberAchieveDiaryBadge() {
        //given
        final Member member = Member.builder()
                                    .provider("google")
                                    .nickname("test")
                                    .email("test@gmail.com")
                                    .build();

        memberRepository.save(member);

        Diary diary = Diary.builder()
                           .member(member)
                           .date(LocalDate.now())
                           .emotion(Emotion.GOOD)
                           .drinkLevel(DrinkLevel.HEAVY)
                           .build();

        diaryRepository.save(diary);

        //when
        badgeService.awardBadgeOnDiaryCountReached(member.getId());
        Optional<Badge> badge = memberHasBadgeRepository.findByMemberIdAndBadgeId(member.getId(), BadgeType.FIRST_DIARY.getId());

        //then
        Assertions.assertThat(badge).isPresent();

        //when
        for (int i = 1; i <= 4; i++) {
            diary = Diary.builder()
                         .member(member)
                         .date(LocalDate.now().minusDays(i))
                         .emotion(Emotion.GOOD)
                         .drinkLevel(DrinkLevel.HEAVY)
                         .build();

            diaryRepository.save(diary);
        }

        badgeService.awardBadgeOnDiaryCountReached(member.getId());
        badge = memberHasBadgeRepository.findByMemberIdAndBadgeId(member.getId(), BadgeType.FIFTH_DIARY.getId());

        //then
        Assertions.assertThat(badge).isPresent();
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