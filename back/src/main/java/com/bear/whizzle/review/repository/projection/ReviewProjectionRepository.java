package com.bear.whizzle.review.repository.projection;

import static com.bear.whizzle.domain.model.entity.QMember.member;
import static com.bear.whizzle.domain.model.entity.QReview.review;
import static com.bear.whizzle.domain.model.entity.QWhisky.whisky;

import com.bear.whizzle.common.annotation.Performance;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.type.ReviewOrder;
import com.bear.whizzle.review.controller.dto.ReviewSearchCondition;
import com.bear.whizzle.review.repository.projection.dto.RatingDto;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
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
                       pagingCondition(searchCondition),
                       memberNe(searchCondition.getMemberId()),
                       review.isDeleted.isFalse())
                .orderBy(getOrderBy(searchCondition), getSecondOrderBy(searchCondition))
                .limit(5)
                .fetch();
    }

    private BooleanExpression memberNe(Long memberId) {
        return (memberId == null) ? null : review.member.id.ne(memberId);
    }

    private OrderSpecifier<?> getSecondOrderBy(ReviewSearchCondition searchCondition) {
        switch (searchCondition.getReviewOrder()) {
            case LIKE:
                return review.id.asc();
            case RECENT:
                return review.id.desc();
            default:
                return null;
        }
    }

    private OrderSpecifier<?> getOrderBy(ReviewSearchCondition searchCondition) {
        switch (searchCondition.getReviewOrder()) {
            case LIKE:
                return review.likeCount.desc(); // 좋아요 많은 순서
            case RECENT:
                return review.createdDateTime.desc(); // 최신 순서
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
                    review.createdDateTime.before(
                            getBaseCreatedDateTime(searchCondition.getBaseId())
                    ).or(
                            review.createdDateTime.eq(getBaseCreatedDateTime(searchCondition.getBaseId()))
                                                  .and(review.id.lt(searchCondition.getBaseId())));
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

    public List<Review> findAllByMemberIdAndSearchCondition(Long memberId, ReviewSearchCondition searchCondition) {
        return queryFactory.select(review)
                           .from(review)
                           .innerJoin(review.whisky, whisky).fetchJoin()
                           .where(review.member.id.eq(memberId),
                                  myPageCondition(searchCondition),
                                  review.isDeleted.isFalse())
                           .orderBy(review.createdDateTime.desc(), review.id.desc())
                           .limit(5)
                           .fetch();
    }

    private BooleanExpression myPageCondition(ReviewSearchCondition searchCondition) {
        return (searchCondition.getBaseId() == null) ? null : review.id.lt(searchCondition.getBaseId());
    }

    public List<Review> findAllByMemberIdAndWhiskyId(Long memberId, Long whiskyId) {
        return queryFactory
                .select(review)
                .from(review)
                .innerJoin(review.member, member).fetchJoin()
                .where(review.whisky.id.eq(whiskyId),
                       review.member.id.eq(memberId),
                       review.isDeleted.isFalse())
                .orderBy(review.createdDateTime.desc(), review.id.desc())
                .limit(3)
                .fetch();
    }

    public List<RatingDto> findAllRatingByMemberInIds(List<Long> memberIds) {
        return queryFactory
                .select(Projections.constructor(
                        RatingDto.class,
                        review.member.id,
                        review.whisky.id,
                        review.rating.multiply(2).intValue()
                ))
                .from(review)
                .where(
                        review.member.id.in(memberIds)
                ).fetch();
    }

}
