package com.bear.whizzle.reviewimage.repository;

import com.bear.whizzle.domain.model.entity.ReviewImage;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReviewImageRepository extends JpaRepository<ReviewImage, Long> {

    @Query("SELECT MAX(ri.imageOrder) FROM ReviewImage  ri WHERE ri.review.id = :reviewId")
    Optional<Integer> findLastOrderByReviewId(@Param("reviewId") Long reviewId);

    @Modifying
    @Query("UPDATE ReviewImage ri SET ri.isDeleted=true WHERE ri.review.id = :reviewId "
            + "AND ri.id IN :deletedReviewImageIds")
    void markDeletedImagesAsDeleted(@Param("reviewId") long reviewId,
                                    @Param("deletedReviewImageIds") List<Long> deletedReviewImageIds);

    @Query("SELECT COUNT(*) FROM ReviewImage  ri WHERE ri.review.id = :reviewId AND ri.isDeleted = false")
    Integer countByReviewIdAndIsDeletedFalse(@Param("reviewId") long reviewId);

}
