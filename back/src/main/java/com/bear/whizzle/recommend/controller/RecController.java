package com.bear.whizzle.recommend.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;
import com.bear.whizzle.recommend.service.RecService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RecController {

    private final RecService recService;

    @GetMapping("/api/rec/whisky/any")
    @ResponseStatus(HttpStatus.OK)
    public String recPersonalWhisky(
            @RequestBody RecWhiskyRequestDto recWhiskyRequestDto) { // ResponseDto 로 반환할 것.
        log.info("rec whisky : {}", recWhiskyRequestDto);
        PreferenceDto preferenceDto = recService.extractPreference(0L, recWhiskyRequestDto);// 비로그인 ID 0L 주입.
        // WebClient Call

        // 위스키 정보 조회

        return null;
    }

    @GetMapping("/api/rec/whisky")
    @ResponseStatus(HttpStatus.OK)
    public String recPersonalWhisky(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                    @RequestBody RecWhiskyRequestDto recWhiskyRequestDto) { // ResponseDto 로 반환할 것.
        log.info("principal : {}", principalDetails);
        log.info("rec whisky : {}", recWhiskyRequestDto);
        PreferenceDto preferenceDto = recService.extractPreference(principalDetails.getMemberId(), recWhiskyRequestDto);
        // WebClient Call

        // 위스키 정보 조회

        return null;
    }

}


