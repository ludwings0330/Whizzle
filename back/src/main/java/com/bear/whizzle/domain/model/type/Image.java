package com.bear.whizzle.domain.model.type;

import com.bear.whizzle.domain.converter.UrlConverter;
import java.io.UncheckedIOException;
import java.net.MalformedURLException;
import java.net.URL;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class Image {

    @NotNull
    private String savedPath; // path(저장된 경로 + 파일 이름)는 AWS에서 key를 의미한다.

    @NotNull
    private String originalName;

    @NotNull
    @Convert(converter = UrlConverter.class)
    private URL url;

    public static Image getDefaultMemberImage() {
        try {
            return Image.builder()
                        .savedPath("images/default/default_member_image.png")
                        .originalName("default_member_image.png")
                        .url(new URL("https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/default/default_member_profile.png"))
                        .build();
        } catch (MalformedURLException e) {
            throw new UncheckedIOException(e);
        }
    }

    public static Image getDefaultWhiskyImage() {
        try {
            return Image.builder()
                        .savedPath("images/default/default_whisky_image.png")
                        .originalName("default_whisky_image.png")
                        .url(new URL("https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/images/default/default_whisky_bottle.png"))
                        .build();
        } catch (MalformedURLException e) {
            throw new UncheckedIOException(e);
        }
    }

}
