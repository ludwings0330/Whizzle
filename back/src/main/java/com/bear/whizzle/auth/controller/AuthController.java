package com.bear.whizzle.auth.controller;

import com.bear.whizzle.auth.service.AuthService;
import com.bear.whizzle.auth.service.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/refresh")
    @ResponseStatus(HttpStatus.OK)
    public String regenerateAccessToken(@AuthenticationPrincipal PrincipalDetails user, @RequestHeader String authorization) {
        return authService.regenerateAccessToken(user, authorization);
    }

}
