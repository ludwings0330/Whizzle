package com.bear.whizzle.member;

import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.savedmodel.repository.SavedModelRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
class LearnedMemberTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private SavedModelRepository savedModelRepository;

    @Test
    @DisplayName("학습된 사용자인지 확인 테스트")
    void isLearnedMemberTest() {
        // given - 아직 학습 포함 안된 사용자
        Long memberId = 1L;

        // when
        Long isLearned = memberRepository.findByIdAndCreatedDateTimeBefore(memberId)
                                                  .map(Member::getId)
                                                  .orElse(0L);

        // then
        Assertions.assertThat(isLearned).isZero();
    }

}
