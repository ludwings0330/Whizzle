package com.bear.whizzle.like.service;

import com.bear.whizzle.domain.model.entity.Review;
import java.util.List;
import java.util.Set;

public interface LikeService {

    void toggleLikeOnReviewByMemberIdAndReviewId(Long memberId, Long reviewId);

    Set<Long> getReviewLikesStatus(Long memberId, List<Review> reviews);

}
