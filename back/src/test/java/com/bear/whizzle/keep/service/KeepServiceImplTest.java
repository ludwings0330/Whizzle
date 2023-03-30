package com.bear.whizzle.keep.service;

import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.member.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class KeepServiceImplTest {

    @Autowired
    private KeepService keepService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    @Transactional
    void keepTest() {
        final Member member = Member.builder()
                                    .email("ludwings@naver.com")
                                    .nickname("test")
                                    .provider("google").build();

        memberRepository.save(member);

        final boolean result = keepService.toggleKeepForWhisky(member.getId(), 10L);

        Assertions.assertThat(result).isTrue();
    }


}