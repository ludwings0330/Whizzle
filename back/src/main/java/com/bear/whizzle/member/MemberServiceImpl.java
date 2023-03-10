package com.bear.whizzle.member;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Long findIdByEmailAndProvider(String email, String provider) {
        final Member member = memberRepository.findByEmailAndProvider(email, provider)
                                              .orElseThrow(() -> new NotFoundException("존재하지 않는 유저"));

        return member.getId();
    }

}
