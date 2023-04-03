package com.bear.whizzle.review.controller.dto;

import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.entity.ReviewImage;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import lombok.Data;

@Data
public class ReviewListResponseDto {

    private ReviewMemberInfo memberInfo;
    private ReviewInfo reviewInfo;

    public ReviewListResponseDto(Review review) {
        this.memberInfo = new ReviewMemberInfo(review.getMember());
        this.reviewInfo = new ReviewInfo(review);
    }

    public ReviewListResponseDto(Review review, Set<Long> likes) {
        this.memberInfo = new ReviewMemberInfo(review.getMember());
        this.reviewInfo = new ReviewInfo(review);

        if (likes.contains(review.getId())) {
            reviewInfo.liked = true;
        }
    }

    @Data
    public static class ReviewMemberInfo {

        private Long memberId;
        private String nickname;
        private URL profileImageUrl;
        private Float level;

        public ReviewMemberInfo(Member member) {
            this.memberId = member.getId();
            this.nickname = member.getNickname();
            this.profileImageUrl = member.getImage().getUrl();
            this.level = member.getLevel();
        }

    }

    @Data
    public static class ReviewInfo {

        private Long reviewId;
        private List<ReviewImageInfo> reviewImages;
        private String content;
        private Float rating;
        private Integer likeCount;
        private LocalDateTime createdDateTime;
        private Boolean liked = false;

        public ReviewInfo(Review review) {
            this.reviewId = review.getId();
            this.content = review.getContent();
            this.rating = review.getRating();
            this.likeCount = review.getLikeCount();
            this.createdDateTime = review.getCreatedDateTime();

            reviewImages = review.getImages()
                                 .stream()
                                 .filter(Predicate.not(ReviewImage::getIsDeleted))
                                 .map(ReviewImageInfo::new)
                                 .collect(Collectors.toList());
        }

    }

    @Data
    public static class ReviewImageInfo {

        private Long reviewImageId;
        private URL reviewImageUrl;
        private Integer reviewImageOrder;

        ReviewImageInfo(ReviewImage image) {
            this.reviewImageId = image.getId();
            this.reviewImageUrl = image.getImage().getUrl();
            this.reviewImageOrder = image.getImageOrder();
        }

    }

}
