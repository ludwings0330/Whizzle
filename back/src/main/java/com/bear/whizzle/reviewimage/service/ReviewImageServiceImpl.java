package com.bear.whizzle.reviewimage.service;

import com.bear.whizzle.cloud.aws.s3.service.AwsS3Service;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.entity.ReviewImage;
import com.bear.whizzle.domain.model.type.Image;
import com.bear.whizzle.reviewimage.repository.ReviewImageRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewImageServiceImpl implements ReviewImageService {

    private final ReviewImageRepository reviewImageRepository;
    private final AwsS3Service awsS3Service;

    @Override
    @Transactional
    public void saveAllReviewImages(Review review, List<MultipartFile> reviewImageFiles) {
        int order = getLastOrderOfReview(review) + 1;

        if (isExceededSizeBeforeAdd(review, reviewImageFiles.size())) {
            throw new IllegalArgumentException("최대 이미지 갯수를 초과했습니다.");
        }

        List<Image> uploadedImages = awsS3Service.uploadReviewImages(reviewImageFiles);

        for (Image image :
                uploadedImages) {
            ReviewImage reviewImage = ReviewImage.builder()
                                                 .imageOrder(order++)
                                                 .image(image)
                                                 .build();

            reviewImage.setReview(review);
        }
    }

    private int getLastOrderOfReview(Review review) {
        return reviewImageRepository.findLastOrderByReviewId(review.getId()).orElse(0);
    }

    @Override
    @Transactional
    public void deleteAllReviewImages(Review review, List<Long> deletedReviewImageIds) {
        reviewImageRepository.markDeletedImagesAsDeleted(review.getId(), deletedReviewImageIds);
    }

    private boolean isExceededSizeBeforeAdd(Review review, int addedSize) {
        return reviewImageRepository.countByReviewIdAndIsDeletedFalse(review.getId()) + addedSize > 5;
    }

}
