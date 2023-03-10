package com.bear.whizzle.auth.service;

import com.bear.whizzle.auth.repository.TokenRepository;
import com.bear.whizzle.common.util.JwtUtil;
import com.bear.whizzle.domain.model.entity.Token;
import com.bear.whizzle.member.MemberService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthServiceImpl implements AuthService {

    private final JwtUtil jwtUtil;
    private final MemberService memberService;
    private final TokenRepository tokenRepository;

    @Override
    public String regenerateAccessToken(PrincipalDetails user, String authorization) {
        String refreshToken = jwtUtil.resolveToken(authorization);

        final Long memberId = memberService.findIdByEmailAndProvider(user.getEmail(), user.getProvider());
        final Token savedToken = tokenRepository.findByMemberId(memberId).orElseThrow();

        if (savedToken.getRefreshToken().equals(refreshToken)) {
            return jwtUtil.generateAccessToken(user);
        }

        throw new JwtException("토큰 재발급 중 예외 발생");
    }

    @Override
    @Transactional
    public void logout(PrincipalDetails user) {
        Long memberId = memberService.findIdByEmailAndProvider(user.getEmail(), user.getProvider());
        Token token = tokenRepository.findByMemberId(memberId).orElseThrow();

        token.clearRefreshToken();
    }

}
