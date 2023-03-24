package com.bear.whizzle.like.service;

import com.bear.whizzle.domain.model.entity.Like;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.like.repository.LikeRepository;
import com.bear.whizzle.member.repository.MemberRepository;
import com.bear.whizzle.review.repository.ReviewRepository;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
class LikeServiceImplTest {

    @Autowired
    private LikeService likeService;

    @Autowired
    private LikeRepository likeRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private WhiskyRepository whiskyRepository;

    @Test
    @DisplayName("좋아요 표시")
    @Transactional
    void toggleLikeOn() {
        //given
        Member member = createMember();
        Review review = createReview(member);

        //when
        likeService.toggleLikeOnReviewByMemberIdAndReviewId(member.getId(), review.getId());

        //then
        final Optional<Like> like = likeRepository.findByReviewIdAndMemberId(review.getId(), member.getId());
        Assertions.assertThat(like).isPresent();
        Assertions.assertThat(review.getLikeCount()).isEqualTo(1);
    }

    @Test
    @DisplayName("좋아요 취소")
    @Transactional
    void toggleLikeOff() {
        //given
        Member member = createMember();
        Review review = createReview(member);

        //when
        likeService.toggleLikeOnReviewByMemberIdAndReviewId(member.getId(), review.getId());

        //then 1
        Optional<Like> like = likeRepository.findByReviewIdAndMemberId(review.getId(), member.getId());
        Assertions.assertThat(like).isPresent();
        Assertions.assertThat(review.getLikeCount()).isEqualTo(1);
        // 두번 실행하면 취소된다.
        likeService.toggleLikeOnReviewByMemberIdAndReviewId(member.getId(), review.getId());

        //then 2
        like = likeRepository.findByReviewIdAndMemberId(review.getId(), member.getId());
        Assertions.assertThat(like).isNotPresent();
        Assertions.assertThat(review.getLikeCount()).isZero();
    }

    private Member createMember() {
        Member member = Member.builder().nickname("test").provider("google").email("test@gmail.com")
                              .build();
        memberRepository.save(member);

        return member;
    }

    private Review createReview(Member member) {
        final Whisky whisky = whiskyRepository.getReferenceById(10L);

        Review review = Review.builder()
                              .member(member).content("test").rating(5f).whisky(whisky)
                              .build();
        reviewRepository.save(review);

        return review;
    }

}