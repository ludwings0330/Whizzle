package com.bear.whizzle.keep.controller;

import com.bear.whizzle.auth.service.AuthService;
import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.badge.service.BadgeService;
import com.bear.whizzle.domain.model.type.Action;
import com.bear.whizzle.keep.controller.dto.KeepSearchCondition;
import com.bear.whizzle.keep.service.KeepService;
import com.bear.whizzle.keep.service.query.KeepQueryService;
import com.bear.whizzle.memberlevellog.service.MemberLevelLogService;
import com.bear.whizzle.whisky.repository.projection.dto.WhiskySimpleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/keeps")
@RequiredArgsConstructor
public class KeepController {

    private final AuthService authService;
    private final KeepService keepService;
    private final KeepQueryService keepQueryService;
    private final MemberLevelLogService levelLogService;
    private final BadgeService badgeService;

    /**
     * 특정 회원의 킵한 위스키 목록과 상태 코드 200으로 응답합니다. 이때, 자신이 킵한 위스키가 있다면 킵을 표시합니다. 무한 스크롤 방식으로 구현되어 있습니다.
     *
     * @param member          현재 로그인한 회원인 경우에 사용
     * @param pageable        size만 사용하며 기본값은 5
     * @param searchCondition 조회하려는 회원과 마지막으로 조회한 위스키 ID를 받는다
     * @return 특정 회원의 킵한 위스키 목록을 반환
     */
    @GetMapping("/whiskies/any")
    public Slice<WhiskySimpleResponseDto> findKeptWhiskies(
            @AuthenticationPrincipal PrincipalDetails member,
            @PageableDefault(size = 5) Pageable pageable,
            @ModelAttribute KeepSearchCondition searchCondition
    ) {
        if (authService.isLogined(member)) {
            return keepQueryService.findKeptWhiskiesWithMyKeep(member.getMemberId(), pageable, searchCondition);
        }

        return keepQueryService.findKeptWhiskiesWithoutMyKeep(pageable, searchCondition);
    }

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
        boolean isKeep = keepService.toggleKeepForWhisky(member.getMemberId(), whiskyId);
        if (isKeep) {
            levelLogService.increaseLevelByActivity(member.getMemberId(), Action.KEEP);
            badgeService.awardBadgeOnKeepCountReached(member.getMemberId());
        }
    }

}
