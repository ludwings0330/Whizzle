package com.bear.whizzle.common.handler;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.common.util.JwtUtil;
import java.io.IOException;
import java.time.Duration;
import java.util.NoSuchElementException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@Slf4j
public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final RedisTemplate<String, String> redisTemplate;
    private final JwtUtil jwtUtil;
    private final String redirectUrl;

    protected CustomAuthenticationSuccessHandler(RedisTemplate<String, String> redisTemplate, JwtUtil jwtUtil,
                                                 @Value("${app.oauth2.authorizedRedirectUrl}") String redirectURl) {
        this.redisTemplate = redisTemplate;
        this.jwtUtil = jwtUtil;
        this.redirectUrl = redirectURl;
    }

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException {
        log.debug("OAuth 2.0 Login Success");

        // 4. Access, Refresh Token 발급
        final PrincipalDetails user = (PrincipalDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        log.debug("PrincipalDetails in Security Context : {}", user);

        final String accessToken = jwtUtil.generateAccessToken(user);
        log.debug("generated accessToken : {}", accessToken);

        final String refreshToken = jwtUtil.generateRefreshToken(user);
        log.debug("generated refreshToken : {}", refreshToken);

        // 5. Refresh Token 은 DB 에 저장
        try {
            final ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

            // java compiler 에서 자동적으로 StringBuilder 를 사용하는 코드로 Optimization
            final String key = "member:rft:" + user.getMemberId();

            valueOperations.set(key, refreshToken, Duration.ofDays(21));
        } catch (NoSuchElementException e) {
            log.debug("이런 일은 일어날 수 없습니다.");
        }

        // 6. Access, Refresh Token 은 Client 에게 전달
        // 7. Client 가 JWT 인증을 받도록 Redirect 전달
        getRedirectStrategy()
                .sendRedirect(request, response, getRedirectUrlWithTokens(accessToken, refreshToken, user));
    }

    private String getRedirectUrlWithTokens(String accessToken, String refreshToken, PrincipalDetails user) {
        return UriComponentsBuilder.fromUriString(redirectUrl)
                                   .queryParam("accessToken", accessToken)
                                   .queryParam("refreshToken", refreshToken)
                                   .queryParam("isNew", user.isNew())
                                   .build().toUriString();
    }

}
