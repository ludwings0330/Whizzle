package com.bear.whizzle.like.repository;

import com.bear.whizzle.domain.model.entity.Like;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.type.id.LikeId;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LikeRepository extends JpaRepository<Like, LikeId> {

    @Query("SELECT l FROM Like l WHERE l.review.id = :reviewId AND l.member.id = :memberId")
    Optional<Like> findByReviewIdAndMemberId(@Param("reviewId") long reviewId, @Param("memberId") long memberId);

    List<Like> findByMemberIdAndReviewIdIn(@Param("memberId") long memberId, @Param("reviewIds") List<Long> reviewIds);

    List<Like> findAllByReviewIn(List<Review> reviews);

}