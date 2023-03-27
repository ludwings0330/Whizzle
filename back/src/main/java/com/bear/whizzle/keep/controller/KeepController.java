package com.bear.whizzle.keep.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.keep.service.KeepService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/keeps")
@RequiredArgsConstructor
public class KeepController {

    private final KeepService keepService;

    @PostMapping("/{whiskyId}")
    public void keepOrUnkeepWhisky(
            @AuthenticationPrincipal PrincipalDetails member,
            @PathVariable Long whiskyId
    ) {
        keepService.keepOrUnkeepWhisky(member.getMemberId(), whiskyId);
    }

}
