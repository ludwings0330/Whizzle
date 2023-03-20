package com.bear.whizzle.member.controller.dto;

import java.net.URL;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberBaseInfoResponseDto {

    private String nickname;

    private String email;

    private String provider;

    private MemberBaseImageDto image;

    private float level;

    @Data
    @Builder
    public static class MemberBaseImageDto {

        private URL url;
        private String originName;

    }

}
