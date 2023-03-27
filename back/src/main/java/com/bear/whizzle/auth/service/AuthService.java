package com.bear.whizzle.auth.service;

public interface AuthService {

    String regenerateAccessToken(PrincipalDetails user, String authorization);

    boolean canMemberEditReview(long memberId, long reviewId);

    boolean isLogined(PrincipalDetails member);

}
