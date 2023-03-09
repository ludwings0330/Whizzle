package com.bear.whizzle.auth.service;

import com.bear.whizzle.auth.repository.TokenRepository;
import com.bear.whizzle.common.util.JwtUtil;
import com.bear.whizzle.domain.model.entity.Token;
import com.bear.whizzle.member.MemberService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtUtil jwtUtil;
    private final MemberService memberService;
    private final TokenRepository tokenRepository;

    @Override
    public String regenerateAccessToken(PrincipalDetails user, String accessToken) {
        // access token 이 기한이 지났는지 확인
        final Long memberId = memberService.findIdByEmailAndProvider(user.getEmail(), user.getProvider());

        // 1. 기한이 지났다면
        if (jwtUtil.isExpired(accessToken)) {
            // token table 에 저장된 refresh token 꺼내옴
            final Token token = tokenRepository.findByMemberId(memberId).orElseThrow();

            // refresh token 유효성 검증
            if (jwtUtil.valid(token.getRefreshToken())) {
                return jwtUtil.generateAccessToken(user);
            }
        }

        throw new JwtException("토큰 재발급 중 예외 발생");
    }

}
