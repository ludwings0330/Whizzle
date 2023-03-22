package com.bear.whizzle.memberlevellog.service;

import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.type.Action;
import com.bear.whizzle.member.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class MemberLevelLogServiceImplTest {

    @Autowired
    private MemberLevelLogService memberLevelLogService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @DisplayName("로그인 시 경험치 부여")
    @Transactional
    void loginLevelUp() {
        //given
        Member member = createMember();

        float current = member.getLevel();

        //when
        memberLevelLogService.increaseLevelByActivity(member.getId(), Action.LOGIN);

        //then
        Assertions.assertThat(member.getLevel()).isEqualTo(current + Action.LOGIN.getScore());
    }

    @Test
    @DisplayName("하루에 한번만 경험치 부여")
    @Transactional
    void loginLevelUpLimited() {
        //given
        Member member = createMember();

        float current = member.getLevel();

        //when
        memberLevelLogService.increaseLevelByActivity(member.getId(), Action.LOGIN);
        memberLevelLogService.increaseLevelByActivity(member.getId(), Action.LOGIN);

        //then
        Assertions.assertThat(member.getLevel()).isEqualTo(current + Action.LOGIN.getScore());
    }

    @Test
    @DisplayName("리뷰 작성 경험치 부여")
    @Transactional
    void writeReview() {
        //given
        Member member = createMember();
        final Float current = member.getLevel();

        for (int i = 1; i <= 5; i++) {
            // when
            memberLevelLogService.increaseLevelByActivity(member.getId(), Action.REVIEW);

            // then
            Assertions.assertThat(member.getLevel()).isEqualTo(current + Action.REVIEW.getScore() * i);
        }

    }

    @Test
    @DisplayName("다이어리 작성 경험치 부여 - 1회")
    @Transactional
    void writeDiary() {
        //given
        Member member = createMember();
        float current = member.getLevel();

        //when
        memberLevelLogService.increaseLevelByActivity(member.getId(), Action.DIARY);

        //then
        Assertions.assertThat(member.getLevel()).isEqualTo(current + Action.DIARY.getScore());
    }

    @Test
    @DisplayName("다이어리 작성 경험치 부여 - 일일 획득 제한")
    @Transactional
    void writeDiaryLimited() {
        //given
        Member member = createMember();
        float current = member.getLevel();

        //when
        for (int i = 0; i < 10; i++) {
            memberLevelLogService.increaseLevelByActivity(member.getId(), Action.DIARY);
        }

        //then
        Assertions.assertThat(member.getLevel()).isEqualTo(current + Action.DIARY.getScore() * Action.DIARY.getLimit());
    }

    @Test
    @DisplayName("위스키 킵 경험치 부여 - 일일 획득 제한")
    @Transactional
    void keepWhiskyLimited() {
        //given
        Member member = createMember();
        float current = member.getLevel();

        //when
        for (int i = 0; i < 10; i++) {
            memberLevelLogService.increaseLevelByActivity(member.getId(), Action.KEEP);
        }

        //then
        Assertions.assertThat(member.getLevel()).isEqualTo(current + Action.KEEP.getLimit() * Action.KEEP.getScore());
    }

    @Test
    @DisplayName("위스키 킵 경험치 부여 - 일일 획득 제한")
    @Transactional
    void keepWhisky() {
        //given
        Member member = createMember();
        float current = member.getLevel();

        //when
        memberLevelLogService.increaseLevelByActivity(member.getId(), Action.KEEP);

        //then
        Assertions.assertThat(member.getLevel()).isEqualTo(current + Action.KEEP.getScore());
    }

    @Test
    @DisplayName("리뷰좋아요 경험치 부여")
    @Transactional
    void likeReview() {
        //given
        Member member = createMember();
        float current = member.getLevel();

        //when
        memberLevelLogService.increaseLevelByActivity(member.getId(), Action.LIKE);

        //then
        Assertions.assertThat(member.getLevel()).isEqualTo(current + Action.LIKE.getScore());
    }

    @Test
    @DisplayName("리뷰좋아요 경험치 부여 - 일일 획득 제한")
    @Transactional
    void likeReviewLimited() {
        //given
        Member member = createMember();
        float current = member.getLevel();

        //when
        for (int i = 0; i < 10; i++) {
            memberLevelLogService.increaseLevelByActivity(member.getId(), Action.LIKE);
        }

        //then
        Assertions.assertThat(member.getLevel())
                  .isEqualTo(current + Action.LIKE.getScore() * Action.LIKE.getLimit());
    }

    @Test
    @DisplayName("자정 Counter 초기화 검증")
    @Transactional
    void clearLevelLogByDaily() {
        //given
        Member member = createMember();
        final Float current = member.getLevel();

        //when
        memberLevelLogService.increaseLevelByActivity(member.getId(), Action.LOGIN);

        memberLevelLogService.clearLevelLog();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        memberLevelLogService.increaseLevelByActivity(member.getId(), Action.LOGIN);

        //then
        Assertions.assertThat(member.getLevel()).isEqualTo(current + Action.LOGIN.getScore() * 2);
    }

    private Member createMember() {
        final Member member = Member.builder()
                                    .email("test@gmail.com")
                                    .provider("GOOGLE")
                                    .nickname("test")
                                    .build();

        memberRepository.save(member);

        return member;
    }

}