package com.bear.whizzle.common.util;

import com.bear.whizzle.auth.service.PrincipalDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
public class JwtUtil {

    private static final long SECOND = 1000;
    private static final long MINUTE = 60 * SECOND;
    private static final long HOUR = 60 * MINUTE;
    private static final long DAY = 24 * HOUR;
    private static final long REFRESH_TOKEN_EXPIRATION_TIME = 21 * DAY;
    private static final long ACCESS_TOKEN_EXPIRATION_TIME = 30 * MINUTE;
    private final Key key;

    protected JwtUtil(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(PrincipalDetails user, long expirationTime) {
        return Jwts.builder()
                   .claim("memberId", user.getMemberId())
                   .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                   .signWith(key, SignatureAlgorithm.HS256)
                   .compact();
    }

    public String generateRefreshToken(PrincipalDetails user) {
        return this.generateToken(user, REFRESH_TOKEN_EXPIRATION_TIME);
    }

    public String generateAccessToken(PrincipalDetails user) {
        return this.generateToken(user, ACCESS_TOKEN_EXPIRATION_TIME);
    }

    public String resolveToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        return this.resolveToken(authorization);
    }

    public String resolveToken(String authorization) {
        // Bearer -> JWT 또는 OAuth 인증을 사용하는 경우 붙인다
        if (StringUtils.hasText(authorization) && authorization.startsWith("Bearer ")) {
            return authorization.substring("Bearer ".length());
        }

        return null;
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(key)
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }

    public Authentication getAuthentication(String token) {
        final Claims claims = this.getClaims(token);

        final PrincipalDetails user = PrincipalDetails.builder()
                                                      .memberId(((Integer) claims.get("memberId")).longValue())
                                                      .build();

        return new UsernamePasswordAuthenticationToken(user, token, null);
    }

    public boolean isValid(String token) {
        try {
            this.getClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            log.debug("만료된 토큰");
        } catch (JwtException e) {
            log.debug("유효하지 않은 토큰");
        } catch (Exception e) {
            log.debug("토큰 유효성 검사 중 알 수 없는 예외 발생");
        }

        return false;
    }

}
