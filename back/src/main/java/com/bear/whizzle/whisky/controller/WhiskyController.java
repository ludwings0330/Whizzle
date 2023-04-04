package com.bear.whizzle.whisky.controller;

import com.bear.whizzle.auth.service.AuthService;
import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.domain.model.document.WhiskyDocument;
import com.bear.whizzle.preference.repository.projection.dto.PreferenceStatisticsDto;
import com.bear.whizzle.preference.service.query.PreferenceQueryService;
import com.bear.whizzle.whisky.controller.dto.WhiskyDetailResponseDto;
import com.bear.whizzle.whisky.controller.dto.WhiskySearchCondition;
import com.bear.whizzle.whisky.mapper.WhiskyMapper;
import com.bear.whizzle.whisky.repository.WhiskyElasticSearchRepository;
import com.bear.whizzle.whisky.repository.projection.dto.WhiskySimpleResponseDto;
import com.bear.whizzle.whisky.service.WhiskyService;
import com.bear.whizzle.whisky.service.query.WhiskyQueryService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/whiskies")
@RequiredArgsConstructor
public class WhiskyController {

    private final AuthService authService;
    private final WhiskyService whiskyService;
    private final WhiskyElasticSearchRepository whiskySearchRepository;
    private final WhiskyQueryService whiskyQueryService;
    private final PreferenceQueryService preferenceQueryService;

    /**
     * 위스키 이름을 이용하여 위스키 목록을 조회한다.
     * 조회에 성공하면 위스키 목록, 현재 목록이 마지막인지 확인하는 값과 상태 코드 200으로 응답한다.
     *
     * @param member          로그인한 유저인 경우 null이 아닌 값
     * @param pageable        페이징 처리를 위해 사용한다. page 변수는 사용하지 않고, size만 사용한다.
     * @param searchCondition 검색어와 조회한 목록 중 마지막 위스키 ID를 받는다.
     * @return 검색어를 이름에 포함하는 위스키 목록을 반환
     */
    @GetMapping("/search/any")
    public Slice<WhiskySimpleResponseDto> findWhiskies(
            @AuthenticationPrincipal PrincipalDetails member,
            @PageableDefault(size = 5) Pageable pageable,
            @ModelAttribute WhiskySearchCondition searchCondition
    ) {
        if (authService.isLogined(member)) {
            return whiskyQueryService.findWhiskiesWithKeep(member.getMemberId(), pageable, searchCondition);
        }

        return whiskyQueryService.findWhiskiesWithoutKeep(pageable, searchCondition);
    }

    /**
     * 위스키 상세 정보 조회에 성공할 경우 그 정보와 상태 코드 200으로 응답
     *
     * @param whiskyId 조회하려는 위스키 ID
     * @return 위스키 상세 정보
     * @throws com.bear.whizzle.domain.exception.NotFoundException 잘못된 위스키 ID로 조회하여 위스키를 찾을 수 없을 때 발생
     */
    @GetMapping("/{whiskyId}/any")
    public WhiskyDetailResponseDto findWhisky(@PathVariable Long whiskyId) {
        return WhiskyMapper.toWhiskyDetailResponseDto(
                whiskyService.findWhisky(whiskyId)
        );
    }

    /**
     * 특정 위스키의 선호 통계와 상태 코드 200을 응답
     *
     * @param whiskyId 선호 통계를 조사하려는 위스키 ID
     * @return 선호 {나이대, 성별}에 대한 정보, 선호 정보가 없을 경우 null을 반환
     */
    @GetMapping("/{whiskyId}/statistics/any")
    public PreferenceStatisticsDto estimateWhiskyTopPreference(@PathVariable Long whiskyId) {
        return preferenceQueryService.estimateWhiskyTopPreference(whiskyId);
    }

    @GetMapping("/suggest/{whiskyName}/any")
    public List<WhiskyDocument> autocompleteWhiskyName(@PathVariable String whiskyName) {
        return whiskySearchRepository.suggestByName(whiskyName);
    }

    @GetMapping("/count/any")
    public Integer countWhiskies(@RequestParam String word) {
        return whiskyService.countWhiskies(word);
    }

}
