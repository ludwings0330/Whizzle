package com.bear.whizzle.review.controller.dto;

import com.bear.whizzle.domain.model.type.ReviewOrder;
import lombok.Data;

@Data
public class ReviewSearchCondition {

    private Long baseId;
    private ReviewOrder reviewOrder = ReviewOrder.LIKE;
    private Long memberId;

}
