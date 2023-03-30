package com.bear.whizzle.like.service;

import com.bear.whizzle.domain.model.entity.Like;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.type.Action;
import com.bear.whizzle.like.repository.LikeRepository;
import com.bear.whizzle.member.service.MemberService;
import com.bear.whizzle.memberlevellog.service.MemberLevelLogService;
import com.bear.whizzle.review.service.ReviewService;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LikeServiceImpl implements LikeService {

    private final LikeRepository likeRepository;
    private final MemberService memberService;
    private final ReviewService reviewService;
    private final MemberLevelLogService levelLogService;

    @Override
    @Transactional
    public void toggleLikeOnReviewByMemberIdAndReviewId(Long memberId, Long reviewId) {

        likeRepository.findByReviewIdAndMemberId(reviewId, memberId)
                      .ifPresentOrElse(
                              like -> likeDeleteProcess(reviewId, like),
                              () -> likeSaveProcess(memberId, reviewId));
    }

    @Override
    public Set<Long> getReviewLikesStatus(Long memberId, List<Review> reviews) {
        List<Long> reviewIds = extractReviewIds(reviews);

        final List<Like> likes = likeRepository.findByMemberIdAndReviewIdIn(memberId, reviewIds);

        return likes.stream().map(like -> like.getReview().getId()).collect(Collectors.toSet());
    }

    private List<Long> extractReviewIds(List<Review> reviews) {
        List<Long> reviewIds = new ArrayList<>();

        for (Review review :
                reviews) {
            reviewIds.add(review.getId());
        }

        return reviewIds;
    }

    private Like createLike(Long memberId, Long reviewId) {
        // memberId 와 reviewId 가 존재하는 것인지 검증해야한다. 각 서비스안에 검증로직이 들어있음
        Member member = memberService.findMemberById(memberId);

        Review review = reviewService.findByReviewId(reviewId);

        review.countUpLike();

        return Like.builder()
                   .member(member)
                   .review(review)
                   .build();
    }

    private void likeDeleteProcess(Long reviewId, Like like) {
        likeRepository.delete(like);

        Review review = reviewService.findByReviewId(reviewId);
        review.countDownLike();
    }

    private void likeSaveProcess(Long memberId, Long reviewId) {
        likeRepository.save(createLike(memberId, reviewId));
        levelLogService.increaseLevelByActivity(memberId, Action.LIKE);
    }

}
