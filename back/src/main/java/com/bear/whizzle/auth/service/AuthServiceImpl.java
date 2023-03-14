package com.bear.whizzle.auth.service;

import com.bear.whizzle.common.util.JwtUtil;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthServiceImpl implements AuthService {

    private final JwtUtil jwtUtil;

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public String regenerateAccessToken(PrincipalDetails user, String authorization) {
        final String refreshToken = jwtUtil.resolveToken(authorization);

        final ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        final String key = user.getEmail() + ":" + user.getProvider();
        final String savedToken = valueOperations.get(key);

        if (savedToken != null && savedToken.equals(refreshToken)) {
            return jwtUtil.generateAccessToken(user);
        }

        throw new JwtException("토큰 재발급 중 예외 발생");
    }

}
