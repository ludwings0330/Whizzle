package com.bear.whizzle.review.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.like.service.LikeService;
import com.bear.whizzle.review.controller.dto.ReviewWriteRequestDto;
import com.bear.whizzle.review.service.ReviewService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

}
