package com.bear.whizzle.member.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.badge.controller.dto.BadgeResponseDto;
import com.bear.whizzle.badge.service.BadgeService;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.member.controller.dto.MemberBaseInfoResponseDto;
import com.bear.whizzle.member.converter.MemberConverter;
import com.bear.whizzle.member.service.MemberService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
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

    private final BadgeService badgeService;


    @GetMapping("/{memberId}")
    public MemberBaseInfoResponseDto findMember(@PathVariable Long memberId) {
        final Member member = memberService.findMemberById(memberId);
        return MemberConverter.toMemberBaseInfoDto(member);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateMemberInfo(@AuthenticationPrincipal PrincipalDetails user,
                                 @RequestParam(required = false) String nickname,
                                 @RequestParam(required = false) MultipartFile profileImageFile) {
        memberService.updateMemberBaseInfo(user, nickname, profileImageFile);
    }

    @GetMapping("/{memberId}/badges")
    public List<BadgeResponseDto> findAllBadgesByMemberId(@PathVariable Long memberId) {
        return badgeService.findAllBadgeByMemberId(memberId);
    }


}
