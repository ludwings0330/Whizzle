package com.bear.whizzle.review.service.query;

import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.review.controller.dto.ReviewSearchCondition;
import java.util.List;

public interface ReviewQueryService {

    List<Review> findAllReviewByWhiskyIdAndSearchCondition(Long whiskyId, ReviewSearchCondition searchCondition);

    List<Review> findAllReviewByMemberId(Long memberId, ReviewSearchCondition searchCondition);

    List<Review> findAllReviewByMemberIdAndWhiskyId(Long memberId, Long whiskyId);

}
