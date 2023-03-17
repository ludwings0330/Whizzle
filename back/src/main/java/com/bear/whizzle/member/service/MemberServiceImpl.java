package com.bear.whizzle.member.service;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member findByEmailAndProvider(String email, String provider) {
        return memberRepository.findByEmailAndProvider(email, provider)
                               .orElseThrow(() -> new NotFoundException("존재하지 않는 유저"));
    }

}
