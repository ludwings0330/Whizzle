package com.bear.whizzle.review.service;

import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.review.repository.ReviewRepository;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ReviewServiceImplTest {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private WhiskyRepository whiskyRepository;

    @Test
    @DisplayName("회원이 작성한 리뷰 갯수 반환")
    void getReviewCountByMemberId() {

        final Member member = memberRepository.getReferenceById(1L);

        final long reviewCount = reviewService.getReviewCountByMemberId(1L);
        final Whisky whisky = whiskyRepository.getReferenceById(1L);

        final Review review = Review.builder().content("content")
                                    .rating(3f)
                                    .member(member)
                                    .whisky(whisky)
                                    .build();

        reviewRepository.save(review);

        Assertions.assertThat(reviewCount + 1)
                  .isEqualTo(reviewService.getReviewCountByMemberId(member.getId()));

    }

}