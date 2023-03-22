package com.bear.whizzle.review.service;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public long getReviewCountByMemberId(Long memberId) {
        return reviewRepository.countByMemberId(memberId);
    }

    @Override
    public Review findByReviewId(long reviewId) {
        return reviewRepository.findById(reviewId).orElseThrow(() -> new NotFoundException("존재하지 않는 review 입니다."));
    }

}
