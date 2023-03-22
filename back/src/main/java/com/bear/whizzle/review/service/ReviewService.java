package com.bear.whizzle.review.service;

import com.bear.whizzle.domain.model.entity.Review;

public interface ReviewService {

    long getReviewCountByMemberId(Long memberId);

    Review findByReviewId(long reviewId);

}
