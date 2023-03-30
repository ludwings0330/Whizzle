package com.bear.whizzle.review.repository;

import com.bear.whizzle.domain.model.entity.Review;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT COUNT(*) FROM Review r WHERE r.member.id = :memberId")
    Long countByMemberId(@Param("memberId") Long memberId);

    @Query("SELECT r FROM Review r WHERE r.whisky.id = :whiskyId AND r.rating >= :rating")
    List<Review> findAllByWhiskyIdAndRatingGreaterThanEqual(Long whiskyId, Float rating);

}
