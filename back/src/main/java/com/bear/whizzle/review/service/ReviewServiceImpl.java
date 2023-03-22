package com.bear.whizzle.review.service;

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

}
