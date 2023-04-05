package com.bear.whizzle.recommend.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.recommend.controller.dto.PersonalWhiskyCallDto;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyResponseDto;
import com.bear.whizzle.recommend.controller.dto.SimilarWhiskyResponseDto;
import com.bear.whizzle.recommend.service.RecService;
import com.bear.whizzle.whisky.service.query.WhiskyQueryService;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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
            @RequestBody(required = false) RecWhiskyRequestDto recWhiskyRequestDto
    ) throws UnprocessableEntity, NotFoundException, InternalServerError {
        log.info("위스키 추천 Request Data - member : {} RecWhiskyRequestDto : {}", member, recWhiskyRequestDto);
        Long memberId = member == null ? 0L : member.getMemberId();
        List<PreferenceDto> preferenceDtos = new ArrayList<>();
        PreferenceDto preferenceDto = recService.extractPreference(memberId, recWhiskyRequestDto);
        Long recMemberId = recService.isLearnedMember(memberId);
        preferenceDto.setMemberId(recMemberId);
        preferenceDtos.add(preferenceDto);
        return recService.findRecommendWhiskies(
                recService.filterByPriceTier(
                        recWebClientCall(PersonalWhiskyCallDto.builder()
                                                              .memberId(memberId)
                                                              .preferenceDtoList(preferenceDtos)
                                                              .build()),
                        preferenceDto.getPriceTier()
                ),
                memberId,
                RecWhiskyResponseDto.class
        );
    }

    /**
     * 유사한 위스키 조회 - categorical variable and numeric variable 이용한 탐색 로그인 비로그인 구분 X
     *
     * @param member   접근중인 주체
     * @param whiskyId 위스키 id
     * @return 입력받은 위스키와 유사한 위스키 5개
     * @throws NotFoundException   : 위스키 존재하지 않은 경우 발생
     * @throws UnprocessableEntity : fastAPI로 전달한 parameter 오류
     */
    @GetMapping("/api/similar-whisky/{whiskyId}/any")
    @ResponseStatus(HttpStatus.OK)
    public List<SimilarWhiskyResponseDto> similarWhisky(
            @AuthenticationPrincipal PrincipalDetails member,
            @PathVariable @Min(1) Long whiskyId
    ) throws NotFoundException, UnprocessableEntity {
        // 위스키 존재 여부 파악
        whiskyQueryService.exsistByIdCached(whiskyId);
        return recService.findRecommendWhiskies(simWebClientCall(whiskyId), member == null ? 0L : member.getMemberId(),
                                                SimilarWhiskyResponseDto.class);
    }

    /**
     * 위스키 추천 RestAPI - fastAPI
     *
     * @param personalWhiskyCallDto
     * @return List<Long> : 추천 순위로 정렬된 위스키 index
     * @throws UnprocessableEntity : fastAPI로 전달한 parameter 오류
     * @throws InternalServerError : 학습된 모델에 포함되지 않은 기존 사용자 추천 로직 수행
     */
    private List<Long> recWebClientCall(PersonalWhiskyCallDto personalWhiskyCallDto) throws UnprocessableEntity, InternalServerError {
        return webClient.post()
                        .uri("/rec/personal-whisky")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                        .bodyValue(personalWhiskyCallDto)
                        .retrieve()
                        .bodyToFlux(Long.class)
                        .toStream().collect(Collectors.toList());
    }

    /**
     * 유사 위스키 조회 RestAPI - fastAPI
     *
     * @param whiskyId
     * @return List<Long> : 유사도 순위로 정렬된 위스키 index
     * @throws UnprocessableEntity : fastAPI로 전달한 parameter 오류
     */
    private List<Long> simWebClientCall(Long whiskyId) throws UnprocessableEntity {
        return webClient.get()
                        .uri("/rec/similar-whisky/{whiskyId}", whiskyId)
                        .accept(MediaType.APPLICATION_JSON)
                        .retrieve()
                        .bodyToFlux(Long.class)
                        .toStream().collect(Collectors.toList());
    }

}


