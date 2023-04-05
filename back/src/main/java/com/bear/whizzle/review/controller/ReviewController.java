package com.bear.whizzle.review.controller;

import com.bear.whizzle.auth.service.AuthService;
import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.badge.service.BadgeService;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.type.Action;
import com.bear.whizzle.like.service.LikeService;
import com.bear.whizzle.memberlevellog.service.MemberLevelLogService;
import com.bear.whizzle.retrain.handler.RetrainHandler;
import com.bear.whizzle.review.controller.dto.ReviewListResponseDto;
import com.bear.whizzle.review.controller.dto.ReviewMyPageResponseDto;
import com.bear.whizzle.review.controller.dto.ReviewSearchCondition;
import com.bear.whizzle.review.controller.dto.ReviewUpdateRequestDto;
import com.bear.whizzle.review.controller.dto.ReviewWriteRequestDto;
import com.bear.whizzle.review.mapper.ReviewMapper;
import com.bear.whizzle.review.service.ReviewService;
import com.bear.whizzle.review.service.query.ReviewQueryService;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
@Slf4j
public class ReviewController {

    private final LikeService likeService;
    private final ReviewService reviewService;
    private final ReviewQueryService reviewQueryService;
    private final AuthService authService;
    private final MemberLevelLogService levelLogService;
    private final BadgeService badgeService;
    private final RetrainHandler retrainHandler;

    @GetMapping("/whiskies/{whiskyId}/my")
    public List<ReviewListResponseDto> getMemberReviewsOnWhisky(@AuthenticationPrincipal PrincipalDetails member,
                                                                @PathVariable Long whiskyId) {
        List<Review> reviews = reviewQueryService.findAllReviewByMemberIdAndWhiskyId(member.getMemberId(), whiskyId);

        return ReviewMapper.toReviewListResponseDto(reviews);
    }

    @GetMapping("/whiskies/{whiskyId}/any")
    @ResponseStatus(HttpStatus.OK)
    public List<ReviewListResponseDto> getWhiskyReviewsByWhiskyId(@AuthenticationPrincipal PrincipalDetails member,
                                                                  @PathVariable Long whiskyId,
                                                                  @ModelAttribute ReviewSearchCondition searchCondition) {
        if (authService.isLogined(member)) {
            searchCondition.setMemberId(member.getMemberId());
        }

        List<Review> reviews = reviewQueryService.findAllReviewByWhiskyIdAndSearchCondition(whiskyId, searchCondition);
        Set<Long> likeSet = new HashSet<>();

        if (authService.isLogined(member)) {
            likeSet = likeService.getReviewLikesStatus(member.getMemberId(), reviews);
        }

        return ReviewMapper.toReviewListResponseDto(reviews, likeSet);
    }

    @GetMapping("/members/{memberId}/any")
    public List<ReviewMyPageResponseDto> getMemberReviews(@PathVariable Long memberId,
                                                          @ModelAttribute ReviewSearchCondition searchCondition) {
        List<Review> reviews = reviewQueryService.findAllReviewByMemberId(memberId, searchCondition);

        return ReviewMapper.toReviewMyPageResponseDto(reviews);
    }

    @PostMapping("/{reviewId}/like")
    public void toggleLikeOnReview(@AuthenticationPrincipal PrincipalDetails member,
                                   @PathVariable Long reviewId) {
        likeService.toggleLikeOnReviewByMemberIdAndReviewId(member.getMemberId(), reviewId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void writeReview(@AuthenticationPrincipal PrincipalDetails member,
                            @ModelAttribute @Valid ReviewWriteRequestDto reviewWriteRequestDto,
                            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException("Invalid input data");
        }

        reviewService.writeReview(member.getMemberId(), reviewWriteRequestDto);
        levelLogService.increaseLevelByActivity(member.getMemberId(), Action.REVIEW);
        badgeService.awardBadgeOnReviewCountReached(member.getMemberId());
        retrainHandler.retrainExistedMember(member.getMemberId());
    }

    @PutMapping("/{reviewId}")
    @PreAuthorize("@authService.canMemberEditReview(#member.memberId, #reviewId)")
    public void updateReview(@AuthenticationPrincipal PrincipalDetails member,
                             @PathVariable Long reviewId,
                             @ModelAttribute @Valid ReviewUpdateRequestDto reviewUpdateRequestDto) {
        reviewService.updateReview(reviewId, reviewUpdateRequestDto);
        retrainHandler.retrainExistedMember(member.getMemberId());
    }

    @DeleteMapping("/{reviewId}")
    @PreAuthorize("@authService.canMemberEditReview(#member.memberId, #reviewId)")
    public void deleteReview(@AuthenticationPrincipal PrincipalDetails member,
                             @PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
    }

}
