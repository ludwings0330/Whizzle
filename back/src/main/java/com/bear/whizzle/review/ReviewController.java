package com.bear.whizzle.review;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.like.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {

    private final LikeService likeService;

    @PostMapping("/{reviewId}/like")
    @ResponseStatus(HttpStatus.OK)
    public void toggleLikeOnReview(@AuthenticationPrincipal PrincipalDetails user,
                                   @PathVariable Long reviewId) {
        likeService.toggleLikeOnReviewByMemberIdAndReviewId(user.getMemberId(), reviewId);
    }

}
