package com.bear.whizzle.recommend.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyResponseDto;
import com.bear.whizzle.recommend.controller.dto.SimilarWhiskyResponseDto;
import com.bear.whizzle.recommend.service.RecService;
import com.bear.whizzle.whisky.service.query.WhiskyQueryService;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.UnprocessableEntity;
import org.springframework.web.client.HttpServerErrorException.InternalServerError;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequiredArgsConstructor
public class RecController {

    private final WebClient webClient;
    private final RecService recService;
    private final WhiskyQueryService whiskyQueryService;

    /**
     * 위스키 추천 조회 로그인, 비로그인 구분 X
     *
     * @param member              접근중인 주체
     * @param recWhiskyRequestDto : 사용자 선호 정보
     * @return topK 개 추천 위스키 정보 조회
     * @throws UnprocessableEntity : fastAPI로 전달한 parameter 오류
     * @throws InternalServerError : 학습된 모델에 포함되지 않은 기존 사용자 추천 로직 수행
     */
    @PostMapping("/api/rec/whisky/any")
    @ResponseStatus(HttpStatus.OK)
    public List<RecWhiskyResponseDto> recPersonalWhisky(
            @AuthenticationPrincipal PrincipalDetails member,
            @RequestBody RecWhiskyRequestDto recWhiskyRequestDto
    ) throws UnprocessableEntity, NotFoundException, InternalServerError {
        Long memberId = member == null ? 0L : member.getMemberId();

        PreferenceDto preferenceDto = recService.extractPreference(memberId, recWhiskyRequestDto);
        // member가 학습에 포함된 사용자인지 아닌지 판단 로직 필요

        return recService.findRecommendWhiskies(
                recService.filterByPriceTier(
                        recWebClientCall(preferenceDto), preferenceDto.getPriceTier()
                ),
                memberId,
                RecWhiskyResponseDto.class
        );
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
            throws UnprocessableEntity, NotFoundException {
        Long memberId = principalDetails.getMemberId();
        PreferenceDto preferenceDto = recService.extractPreference(0L, recWhiskyRequestDto); // 학습 여부 판단 로직 필요
        List<Long> recWhiskies = recWebClientCall(preferenceDto);
        List<Long> filteredRecWhikies = recService.filterByPriceTier(recWhiskies, preferenceDto.getPriceTier());
        return recService.findRecWhiskies(filteredRecWhikies, memberId);
    }

    /**
     * 유사한 위스키 조회 - categorical variable and numeric variable 이용한 탐색
     *
     * @param member   접근중인 주체
     * @param whiskyId 위스키 id
     * @return 입력받은 위스키와 유사한 위스키 5개
     * @throws
     */
    @GetMapping("/api/similar-whisky/{whiskyId}/any")
    @ResponseStatus(HttpStatus.OK)
    public List<SimilarWhiskyResponseDto> similarWhisky(
            @AuthenticationPrincipal PrincipalDetails member,
            @PathVariable @Min(1) Long whiskyId) {
        whiskyQueryService.exsistByIdCached(whiskyId);
        List<Long> simWhiskies = simWebClientCall(whiskyId);
        return recService.findSimWhiskies(simWhiskies, member == null ? 0L : member.getMemberId());
    }

    /**
     * 위스키 추천 RestAPI - fastAPI
     *
     * @param preferenceDto
     * @return List<Long> : 추천 순위로 정렬된 위스키 index
     * @throws UnprocessableEntity : fastAPI로 전달한 parameter 오류
     * @throws InternalServerError : 학습된 모델에 포함되지 않은 기존 사용자 추천 로직 수행
     */
    private List<Long> recWebClientCall(PreferenceDto preferenceDto) throws UnprocessableEntity, InternalServerError {
        return webClient.post()
                        .uri("/rec/personal-whisky")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .bodyValue(preferenceDto)
                        .retrieve()
                        .bodyToFlux(Long.class)
                        .toStream().collect(Collectors.toList());
    }

    private List<Long> simWebClientCall(Long whiskyId) {
        return webClient.get()
                        .uri("/rec/similar-whisky/{whiskyId}", whiskyId)
                        .accept(MediaType.APPLICATION_JSON)
                        .retrieve()
                        .bodyToFlux(Long.class)
                        .toStream().collect(Collectors.toList());
    }

}


