package com.bear.whizzle.whisky.repository.projection.dto;

import com.querydsl.core.annotations.QueryProjection;
import java.net.URL;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class WhiskySimpleResponseDto {

    private Long id;

    private String name;

    private URL imageUrl;

    private Integer reviewCount;

    private Float avgRating;

    @Builder.Default
    private Boolean isKept = Boolean.FALSE;

    @QueryProjection
    public WhiskySimpleResponseDto(Long id, String name, URL imageUrl, Integer reviewCount, Float avgRating) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.reviewCount = reviewCount;
        this.avgRating = avgRating;
    }

    public Boolean getIsKept() {
        return Objects.requireNonNullElse(this.isKept, Boolean.FALSE);
    }

    public void keep() {
        this.isKept = Boolean.TRUE;
    }

}
