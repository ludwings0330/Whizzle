package com.bear.whizzle.recommend.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyResponseDto;
import com.bear.whizzle.recommend.service.RecService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.UnprocessableEntity;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RecController {

    private final WebClient webClient;
    private final RecService recService;

    /**
     * 비로그인 위스키 추천 조회
     *
     * @param recWhiskyRequestDto : 사용자 선호 정보
     * @return topK 개 추천 위스키 정보 조회
     * @throws io.lettuce.core.cluster.UnknownPartitionException : fastAPI로 올바르지 않은 데이터 전달 시 발생
     */
    @PostMapping("/api/rec/whisky/any")
    @ResponseStatus(HttpStatus.OK)
    public List<RecWhiskyResponseDto> recPersonalWhisky(
            @RequestBody RecWhiskyRequestDto recWhiskyRequestDto) throws UnprocessableEntity {
        Long memberId = 0L;
        PreferenceDto preferenceDto = recService.extractPreference(memberId, recWhiskyRequestDto);
        log.debug(preferenceDto.toString());
        List<Long> recWhiskies = recWebClientCall(preferenceDto);
        List<Long> filteredRecWhikies = recService.filterByPriceTier(recWhiskies, preferenceDto.getPriceTier());
        return recService.findRecWhiskies(filteredRecWhikies, memberId);
    }

    /**
     * 로그인 위스키 추천 조회
     *
     * @param principalDetails    접근 주체
     * @param recWhiskyRequestDto 사용자 선호 정보
     * @return topK개 추천 위스키 정보 조회
     * @throws io.lettuce.core.cluster.UnknownPartitionException : fastAPI로 올바르지 않은 데이터 전달 시 발생
     */
    @PostMapping("/api/rec/whisky")
    @ResponseStatus(HttpStatus.OK)
    public List<RecWhiskyResponseDto> recPersonalWhisky(@AuthenticationPrincipal PrincipalDetails principalDetails,
                                                        @RequestBody(required = false) RecWhiskyRequestDto recWhiskyRequestDto)
            throws UnprocessableEntity {
        Long memberId = principalDetails.getMemberId();
        PreferenceDto preferenceDto = recService.extractPreference(0L, recWhiskyRequestDto); // 학습 여부 판단 로직 필요
        List<Long> recWhiskies = recWebClientCall(preferenceDto);
        List<Long> filteredRecWhikies = recService.filterByPriceTier(recWhiskies, preferenceDto.getPriceTier());
        return recService.findRecWhiskies(filteredRecWhikies, memberId);
    }

    private List<Long> recWebClientCall(PreferenceDto preferenceDto) {
        return webClient.post()
                        .uri("/rec/personal-whisky")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .bodyValue(preferenceDto)
                        .retrieve()
                        .bodyToFlux(Long.class)
                        .toStream().collect(Collectors.toList());
    }

}


