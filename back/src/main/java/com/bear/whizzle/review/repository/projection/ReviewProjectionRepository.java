package com.bear.whizzle.review.repository.projection;

import static com.bear.whizzle.domain.model.entity.QMember.member;
import static com.bear.whizzle.domain.model.entity.QReview.review;

import com.bear.whizzle.common.annotation.Performance;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.type.ReviewOrder;
import com.bear.whizzle.review.controller.dto.ReviewSearchCondition;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ReviewProjectionRepository {

    private final JPAQueryFactory queryFactory;

    @Performance
    public List<Review> findAllByWhiskyIdAndSearchCondition(long whiskyId, ReviewSearchCondition searchCondition) {
        return queryFactory
                .select(review)
                .from(review)
                .innerJoin(review.member, member).fetchJoin()
                .where(review.whisky.id.eq(whiskyId),
                       pagingCondition(searchCondition))
                .orderBy(getOrderBy(searchCondition))
                .limit(5)
                .fetch();
    }

    private OrderSpecifier<?> getOrderBy(ReviewSearchCondition searchCondition) {
        switch (searchCondition.getReviewOrder()) {
            case LIKE:
                return new OrderSpecifier<>(Order.DESC, review.likeCount);
            case RECENT:
                return new OrderSpecifier<>(Order.DESC, review.createdDateTime);
            default:
                return null;
        }
    }

    private BooleanExpression pagingCondition(ReviewSearchCondition searchCondition) {

        if (Objects.requireNonNull(searchCondition.getReviewOrder()) == ReviewOrder.LIKE) {
            return (searchCondition.getBaseId() == null) ? null :
                    review.likeCount.lt(
                            getLikeCountByReviewId(searchCondition.getBaseId())
                    ).or(
                            review.likeCount.eq(getLikeCountByReviewId(searchCondition.getBaseId()))
                                            .and(review.id.gt(searchCondition.getBaseId())));

        } else if (searchCondition.getReviewOrder() == ReviewOrder.RECENT) {
            return (searchCondition.getBaseId() == null) ? null :
                    review.createdDateTime.after(
                            getBaseCreatedDateTime(searchCondition.getBaseId())
                    ).or(
                            review.createdDateTime.eq(getBaseCreatedDateTime(searchCondition.getBaseId()))
                                                  .and(review.id.gt(searchCondition.getBaseId())));
        }

        return null;
    }

    private JPQLQuery<LocalDateTime> getBaseCreatedDateTime(long reviewId) {
        return JPAExpressions.select(review.createdDateTime)
                             .from(review)
                             .where(
                                     review.id.eq(reviewId)
                             );
    }

    private JPQLQuery<Integer> getLikeCountByReviewId(long reviewId) {
        return JPAExpressions.select(review.likeCount)
                             .from(review)
                             .where(
                                     review.id.eq(reviewId)
                             );
    }

}
