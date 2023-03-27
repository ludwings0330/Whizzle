package com.bear.whizzle.auth.repository;

import java.time.Duration;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CustomAuthorizationRequestRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

    private static final String AUTHORIZATION_REQUEST_PREFIX = "authorization_request:";

    private final RedisTemplate<String, OAuth2AuthorizationRequest> redisTemplate;

    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
        String state = request.getParameter(OAuth2ParameterNames.STATE);

        if (state == null) {
            return null;
        }

        String redisKey = getRedisKey(state);
        return redisTemplate.opsForValue().get(redisKey);
    }

    @Override
    public void saveAuthorizationRequest(
            OAuth2AuthorizationRequest authorizationRequest,
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        String state = authorizationRequest.getState();
        String redisKey = getRedisKey(state);
        redisTemplate.opsForValue().set(redisKey, authorizationRequest, Duration.ofMinutes(5));
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request) {
        String state = request.getParameter(OAuth2ParameterNames.STATE);

        if (state == null) {
            return null;
        }

        String redisKey = getRedisKey(state);
        OAuth2AuthorizationRequest authorizationRequest = redisTemplate.opsForValue().get(redisKey);
        if (authorizationRequest != null) {
            redisTemplate.delete(redisKey);
        }

        return authorizationRequest;
    }

    private String getRedisKey(String state) {
        return AUTHORIZATION_REQUEST_PREFIX + state;
    }
}
