package com.bear.whizzle.reviewimage.repository;

import com.bear.whizzle.domain.model.entity.ReviewImage;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewImageRepository extends JpaRepository<ReviewImage, Long> {

    @Query("SELECT MAX(ri.imageOrder) FROM ReviewImage  ri WHERE ri.review.id = :reviewId")
    Optional<Integer> findLastOrderByReviewId(@Param("reviewId") Long reviewId);

}
