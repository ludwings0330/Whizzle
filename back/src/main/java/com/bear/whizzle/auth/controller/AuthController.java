package com.bear.whizzle.auth.controller;

import com.bear.whizzle.auth.service.AuthService;
import com.bear.whizzle.auth.service.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/refresh")
    public String regenerateAccessToken(@AuthenticationPrincipal PrincipalDetails user, @RequestParam String accessToken) {
        return authService.regenerateAccessToken(user, accessToken);
    }

}
