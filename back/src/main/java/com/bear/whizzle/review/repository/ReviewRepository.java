package com.bear.whizzle.review.repository;

import com.bear.whizzle.domain.model.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Long countByMemberId(Long memberId);

}
