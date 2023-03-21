package com.bear.whizzle.member.mapper;

import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.type.Image;
import com.bear.whizzle.member.controller.dto.MemberBaseInfoResponseDto;
import com.bear.whizzle.member.controller.dto.MemberBaseInfoResponseDto.MemberBaseImageDto;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class MemberMapper {

    public static MemberBaseInfoResponseDto toMemberBaseInfoDto(Member member) {
        final Image image = member.getImage();
        final MemberBaseImageDto baseImageDto = MemberBaseImageDto.builder()
                                                                  .url(image.getUrl())
                                                                  .originName(image.getOriginalName())
                                                                  .build();

        return MemberBaseInfoResponseDto.builder()
                                        .nickname(member.getNickname())
                                        .email(member.getEmail())
                                        .provider(member.getProvider())
                                        .level(member.getLevel())
                                        .image(baseImageDto)
                                        .build();
    }

}
