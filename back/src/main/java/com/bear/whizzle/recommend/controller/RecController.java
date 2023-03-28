package com.bear.whizzle.recommend.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyResponseDto;
import com.bear.whizzle.recommend.service.RecService;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RecController {

    private final RecService recService;

    /**
     * 비로그인 위스키 추천 조회
     *
     * @param recWhiskyRequestDto : 사용자 선호 정보
     * @return topK 개 추천 위스키 정보 조회
     */
    @PostMapping("/api/rec/whisky/any")
    @ResponseStatus(HttpStatus.OK)
    public List<RecWhiskyResponseDto> recPersonalWhisky(
            @RequestBody RecWhiskyRequestDto recWhiskyRequestDto) { // ResponseDto 로 반환할 것.
        Long memberId = 0L;
        PreferenceDto preferenceDto = recService.extractPreference(memberId, recWhiskyRequestDto);// 비로그인 ID 0L 주입.
        // WebClient Call
        // 임시 리스트
        List<Long> recWhiskies = randomShuffle();
        // priceTier Filtering by busing Local Cache
        List<Long> filteredRecWhikies = recService.filterByPriceTier(recWhiskies, preferenceDto.getPriceTier());
        // 위스키 정보 조회
        return recService.findRecWhiskies(filteredRecWhikies, memberId);
    }

    @PostMapping("/api/rec/whisky")
    @ResponseStatus(HttpStatus.OK)
    public List<RecWhiskyResponseDto> recPersonalWhisky(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                        @RequestBody(required = false) RecWhiskyRequestDto recWhiskyRequestDto) { // ResponseDto 로 반환할 것.
        Long memberId = principalDetails.getMemberId();
        PreferenceDto preferenceDto = recService.extractPreference(memberId, recWhiskyRequestDto);
        // 학습된 사용자인지 아직 학습되지 않은 사용자인지 파악 로직 필요.
        // WebClient Call 필요
        // 임시 리스트
        List<Long> recWhiskies = randomShuffle();
        // priceTier Filtering by busing Local Cache
        List<Long> filteredRecWhikies = recService.filterByPriceTier(recWhiskies, preferenceDto.getPriceTier());
        // 위스키 정보 조회
        return recService.findRecWhiskies(filteredRecWhikies, memberId);
    }

    private List<Long> randomShuffle() {
        // Create a list of Long integers from 1 to 3535
        List<Long> numbers = new ArrayList<>();
        for (long i = 1; i <= 3535; i++) {
            numbers.add(i);
        }

        // Shuffle the list randomly
        Collections.shuffle(numbers);
        return numbers;
    }

}


