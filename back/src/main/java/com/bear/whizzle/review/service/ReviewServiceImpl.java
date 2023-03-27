package com.bear.whizzle.review.service;

import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.entity.ReviewImage;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.review.controller.dto.ReviewUpdateRequestDto;
import com.bear.whizzle.review.controller.dto.ReviewWriteRequestDto;
import com.bear.whizzle.review.repository.ReviewRepository;
import com.bear.whizzle.reviewimage.service.ReviewImageService;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final WhiskyRepository whiskyRepository;
    private final MemberRepository memberRepository;
    private final ReviewImageService reviewImageService;

    @Override
    public long getReviewCountByMemberId(Long memberId) {
        return reviewRepository.countByMemberId(memberId);
    }

    @Override
    public Review findByReviewId(long reviewId) {
        return reviewRepository.findById(reviewId).orElseThrow(() -> new NotFoundException("존재하지 않는 review 입니다."));
    }

    @Override
    @Transactional
    public void writeReview(long memberId, ReviewWriteRequestDto requestDto) {
        final Member member = memberRepository.getReferenceById(memberId);
        final Whisky whisky = whiskyRepository.findById(requestDto.getWhiskyId())
                                              .orElseThrow(() -> new NotFoundException("존재하지 않는 위스키입니다."));

        Review review = Review.builder()
                              .member(member)
                              .whisky(whisky)
                              .content(requestDto.getContent())
                              .rating(requestDto.getRating())
                              .build();

        reviewRepository.save(review);

        whisky.updateRatingByReviewSave(review);

        reviewImageService.saveAllReviewImages(review, requestDto.getReviewImageFiles());
    }

    @Override
    @Transactional
    public void updateReview(Long reviewId, ReviewUpdateRequestDto reviewUpdateRequestDto) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new NotFoundException("존재하지 않는 리뷰입니다."));

        review.update(reviewUpdateRequestDto);

        reviewImageService.deleteAllReviewImages(review, reviewUpdateRequestDto.getDeletedReviewImageIds());
        reviewImageService.saveAllReviewImages(review, reviewUpdateRequestDto.getAddedReviewImageFiles());
    }

    @Override
    @Transactional
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                                        .orElseThrow(() -> new NotFoundException("존재하지 않는 리뷰입니다."));

        review.markDeleted();

        List<Long> reviewImageIds = review.getImages().stream()
                                          .map(ReviewImage::getId)
                                          .collect(Collectors.toList());

        review.getWhisky().updateRatingByReviewDelete(review);

        reviewImageService.deleteAllReviewImages(review, reviewImageIds);

    }

}
