package com.bear.whizzle.domain.model.type;

import com.bear.whizzle.domain.converter.UrlConverter;
import java.net.URL;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class Image {

    @Column(unique = true)
    private String savedPath; // path(저장된 경로 + 파일 이름)는 AWS에서 key를 의미한다.

    private String originalName;

    @Convert(converter = UrlConverter.class)
    private URL url;

}
