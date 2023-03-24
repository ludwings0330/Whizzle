package com.bear.whizzle.review.controller.dto;

import com.bear.whizzle.domain.model.entity.Review;
import java.time.LocalDateTime;
import lombok.Data;

@Data
public class ReviewMyPageResponseDto {

    private String whiskyName;
    private Float rating;
    private String content;
    private Integer likeCount;
    private LocalDateTime createdDateTime;
    private Long reviewId;

    public ReviewMyPageResponseDto(Review review) {
        this.whiskyName = review.getWhisky().getName();
        this.rating = review.getRating();
        this.content = review.getContent();
        this.likeCount = review.getLikeCount();
        this.createdDateTime = review.getCreatedDateTime();
        this.reviewId = review.getId();
    }

}
