package com.bear.whizzle.review.repository.projection.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor
@Getter
@ToString
public class RatingDto {

    private Long memberId;
    private Long whiskyId;
    private Integer rating;

}
