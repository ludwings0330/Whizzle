package com.bear.whizzle.common.filter;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.common.util.JwtUtil;
import com.bear.whizzle.domain.model.type.Action;
import com.bear.whizzle.memberlevellog.service.MemberLevelLogService;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final MemberLevelLogService levelLogService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        final String token = jwtUtil.resolveToken(request);

        // 1. request 로 보낸 token 이 valid 한지 확인
        if (StringUtils.hasText(token) && jwtUtil.isValid(token)) {
            // 2. valid 하면 authentication 을 SecurityContext 에 저장
            final Authentication authentication = jwtUtil.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.debug("JWT 인증 및 저장 완료 - authentication : {}", authentication);

            levelLogService.increaseLevelByActivity(((PrincipalDetails) authentication.getPrincipal()).getMemberId(), Action.LOGIN);
        } else {
            // 3. valid 하지 않으면 authentication 이 null 이기 때문에 인증 실패
            log.debug("token 이 올바르지 않음");
        }
        // 4. 예외에 대한 처리는 AccessDeniedHandler 에서 처리

        filterChain.doFilter(request, response);
    }

}
