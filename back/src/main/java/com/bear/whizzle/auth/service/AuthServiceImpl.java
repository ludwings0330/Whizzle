package com.bear.whizzle.auth.service;

import com.bear.whizzle.common.util.JwtUtil;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.review.repository.ReviewRepository;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("authService")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthServiceImpl implements AuthService {

    private final JwtUtil jwtUtil;

    private final ReviewRepository reviewRepository;

    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public String regenerateAccessToken(PrincipalDetails user, String authorization) {
        final String refreshToken = jwtUtil.resolveToken(authorization);

        final ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        final String key = "member:rft:" + user.getMemberId();
        final String savedToken = valueOperations.get(key);

        if (savedToken != null && savedToken.equals(refreshToken)) {
            return jwtUtil.generateAccessToken(user);
        }

        throw new JwtException("토큰 재발급 중 예외 발생");
    }

    @Override
    public boolean canMemberEditReview(long memberId, long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                                        .orElseThrow(() -> new NotFoundException("리뷰를 찾을 수 없습니다."));

        if (Boolean.TRUE.equals(!review.getIsDeleted()) && review.getMember().getId() == memberId) {
            return true;
        } else {
            throw new AccessDeniedException("리뷰 수정 권한이 없습니다.");
        }
    }

    @Override
    public boolean isLogined(PrincipalDetails member) {
        return member != null;
    }

}
