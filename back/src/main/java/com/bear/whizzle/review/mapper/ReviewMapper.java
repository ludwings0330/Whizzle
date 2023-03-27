package com.bear.whizzle.review.mapper;

import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.review.controller.dto.ReviewListResponseDto;
import com.bear.whizzle.review.controller.dto.ReviewMyPageResponseDto;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public final class ReviewMapper {

    private ReviewMapper() {
    }

    public static List<ReviewListResponseDto> toReviewListResponseDto(List<Review> reviews) {
        return reviews.stream().map(ReviewListResponseDto::new).collect(Collectors.toList());
    }

    public static List<ReviewListResponseDto> toReviewListResponseDto(List<Review> reviews, Set<Long> likeSet) {
        return reviews.stream().map(review -> new ReviewListResponseDto(review, likeSet)).collect(Collectors.toList());
    }

    public static List<ReviewMyPageResponseDto> toReviewMyPageResponseDto(List<Review> reviews) {
        return reviews.stream().map(ReviewMyPageResponseDto::new).collect(Collectors.toList());
    }

}
