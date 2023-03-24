package com.bear.whizzle.review.service.query;

import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.review.controller.dto.ReviewSearchCondition;
import com.bear.whizzle.review.repository.projection.ReviewProjectionRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewQueryServiceImpl implements ReviewQueryService {

    private final ReviewProjectionRepository reviewProjectionRepository;

    @Override
    public List<Review> findAllReviewByWhiskyIdAndSearchCondition(Long whiskyId, ReviewSearchCondition searchCondition) {
        List<Review> reviews = reviewProjectionRepository.findAllByWhiskyIdAndSearchCondition(whiskyId, searchCondition);
        reviews.forEach(review -> Hibernate.initialize(review.getImages()));

        return reviews;
    }

}
