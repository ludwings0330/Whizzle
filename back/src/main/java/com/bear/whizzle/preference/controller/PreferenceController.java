package com.bear.whizzle.preference.controller;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.preference.repository.projection.dto.PreferenceStatisticsDto;
import com.bear.whizzle.preference.service.query.PreferenceQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/prefereces")
@RequiredArgsConstructor
public class PreferenceController {

    private final PreferenceQueryService preferenceQueryService;

    /**
     * 특정 위스키의 선호 통계와 상태 코드 200을 응답
     *
     * @param whiskyId 선호 통계를 조사하려는 위스키 ID
     * @return 선호 {나이대, 성별}에 대한 정보
     * @throws NotFoundException 위스키에 작성된 리뷰가 없는 경우 발생하는 예외
     */
    @GetMapping("/{whiskyId}/statistics/any")
    public PreferenceStatisticsDto estimateWhiskyTopPreference(@PathVariable Long whiskyId) throws NotFoundException {
        return preferenceQueryService.estimateWhiskyTopPreference(whiskyId);
    }

}
