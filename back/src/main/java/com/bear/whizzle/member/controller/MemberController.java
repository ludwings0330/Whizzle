package com.bear.whizzle.member.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.member.controller.dto.MemberBaseInfoDto;
import com.bear.whizzle.member.controller.dto.MemberBaseInfoRequestDto;
import com.bear.whizzle.member.converter.MemberConverter;
import com.bear.whizzle.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
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
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public MemberBaseInfoDto findMember(@RequestBody MemberBaseInfoRequestDto requestDto) {
        final Member member = memberService.findByEmailAndProvider(requestDto.getEmail(), requestDto.getProvider());

        return MemberConverter.toMemberBaseInfoDto(member);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateMemberInfo(@AuthenticationPrincipal PrincipalDetails user,
                                 @RequestParam(required = false) String nickname,
                                 @RequestParam(required = false) MultipartFile profileFile) {
        memberService.updateMemberBaseInfo(user, nickname, profileFile);
    }

}
