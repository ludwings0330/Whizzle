package com.bear.whizzle.keep.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.keep.service.KeepService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/keeps")
@RequiredArgsConstructor
public class KeepController {

    private final KeepService keepService;

    @GetMapping("/{whiskyId}")
    public Boolean isKeptWhisky(
            @AuthenticationPrincipal PrincipalDetails member,
            @PathVariable Long whiskyId
    ) {
        return keepService.isKeptWhisky(member.getMemberId(), whiskyId);
    }

    @PostMapping("/{whiskyId}")
    public void toggleKeepForWhisky(
            @AuthenticationPrincipal PrincipalDetails member,
            @PathVariable Long whiskyId
    ) {
        keepService.toggleKeepForWhisky(member.getMemberId(), whiskyId);
    }

}
