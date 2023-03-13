package com.bear.whizzle.auth.service;

public interface AuthService {

    String regenerateAccessToken(PrincipalDetails user, String authorization);

    void logout(PrincipalDetails user);

}
