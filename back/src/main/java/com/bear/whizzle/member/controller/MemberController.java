package com.bear.whizzle.member.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.badge.controller.dto.BadgeResponseDto;
import com.bear.whizzle.badge.service.query.BadgeQueryService;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.retrain.handler.RetrainHandler;
import com.bear.whizzle.member.controller.dto.MemberBaseInfoResponseDto;
import com.bear.whizzle.member.mapper.MemberMapper;
import com.bear.whizzle.member.service.MemberService;
import com.bear.whizzle.preference.controller.dto.MemberPreferenceRequestDto;
import com.bear.whizzle.preference.controller.dto.MemberPreferenceResponseDto;
import com.bear.whizzle.preference.mapper.PreferenceMapper;
import com.bear.whizzle.preference.service.PreferenceService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    private final BadgeQueryService badgeQueryService;

    private final PreferenceService preferenceService;

    private final RetrainHandler retrainHandler;

    @GetMapping("/{memberId}/any")
    public MemberBaseInfoResponseDto findMember(@PathVariable Long memberId) {
        final Member member = memberService.findMemberById(memberId);
        return MemberMapper.toMemberBaseInfoDto(member);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String updateMemberInfo(@AuthenticationPrincipal PrincipalDetails user,
                                 @RequestParam(required = false) String nickname,
                                 @RequestParam(required = false) MultipartFile profileImageFile) {
        return memberService.updateMemberBaseInfo(user, nickname, profileImageFile);
    }

    @GetMapping("/{memberId}/badges/any")
    public List<BadgeResponseDto> findAllBadgesByMemberId(@PathVariable Long memberId) {
        return badgeQueryService.findAllBadgeByMemberId(memberId);
    }

    @GetMapping("/{memberId}/preference/any")
    public MemberPreferenceResponseDto findPreferenceByMemberId(@PathVariable Long memberId) {
        final Preference preference = preferenceService.findByMemberId(memberId);

        return PreferenceMapper.toMemberPreferenceResponseDto(preference);
    }

    @PostMapping("/preference")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateMemberPreference(@AuthenticationPrincipal PrincipalDetails user,
                                       @RequestBody MemberPreferenceRequestDto preference) {
        preferenceService.updateMemberPreference(user, preference);
        retrainHandler.retrainExistedMember(user.getMemberId());
    }

}
