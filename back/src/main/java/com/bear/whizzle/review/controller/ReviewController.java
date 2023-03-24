package com.bear.whizzle.review.controller;

import com.bear.whizzle.auth.service.AuthService;
import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.like.service.LikeService;
import com.bear.whizzle.review.controller.dto.ReviewListResponseDto;
import com.bear.whizzle.review.controller.dto.ReviewMyPageResponseDto;
import com.bear.whizzle.review.controller.dto.ReviewSearchCondition;
import com.bear.whizzle.review.controller.dto.ReviewUpdateRequestDto;
import com.bear.whizzle.review.controller.dto.ReviewWriteRequestDto;
import com.bear.whizzle.review.mapper.ReviewMapper;
import com.bear.whizzle.review.service.ReviewService;
import com.bear.whizzle.review.service.query.ReviewQueryService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @GetMapping("/whiskies/{whiskyId}/any")
    @ResponseStatus(HttpStatus.OK)
    public List<ReviewListResponseDto> getReviewsByWhiskyIdOrderBySearchCondition(@PathVariable Long whiskyId,
                                                                                  @RequestBody ReviewSearchCondition searchCondition) {
        List<Review> reviews = reviewQueryService.findAllReviewByWhiskyIdAndSearchCondition(whiskyId, searchCondition);

        return ReviewMapper.toReviewListResponseDto(reviews);
    }

    @GetMapping("/members/{memberId}/any")
    public List<ReviewMyPageResponseDto> getReviewByMemberId(@PathVariable Long memberId,
                                                             @RequestBody ReviewSearchCondition searchCondition) {
        List<Review> reviews = reviewQueryService.findAllReviewByMemberId(memberId, searchCondition);

        return ReviewMapper.toReviewMyPageResponseDto(reviews);
    }

    @PostMapping("/{reviewId}/like")
    @ResponseStatus(HttpStatus.OK)
    public void toggleLikeOnReview(@AuthenticationPrincipal PrincipalDetails user,
                                   @PathVariable Long reviewId) {
        likeService.toggleLikeOnReviewByMemberIdAndReviewId(user.getMemberId(), reviewId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void writeReview(@AuthenticationPrincipal PrincipalDetails user,
                            @ModelAttribute @Valid ReviewWriteRequestDto reviewWriteRequestDto,
                            BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            throw new IllegalArgumentException("Invalid input data");
        }

        reviewService.writeReview(user.getMemberId(), reviewWriteRequestDto);
    }

    @PutMapping("/{reviewId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateReview(@AuthenticationPrincipal PrincipalDetails user,
                             @PathVariable Long reviewId,
                             @ModelAttribute @Valid ReviewUpdateRequestDto reviewUpdateRequestDto) {
        if (authService.canMemberEditReview(user.getMemberId(), reviewId)) {
            reviewService.updateReview(reviewId, reviewUpdateRequestDto);
        } else {
            throw new AccessDeniedException("리뷰 수정 권한이 없습니다.");
        }
    }

}
