package com.bear.whizzle.reviewimage.service;

import com.bear.whizzle.cloud.aws.s3.service.AwsS3Service;
import com.bear.whizzle.domain.model.entity.Review;
import com.bear.whizzle.domain.model.entity.ReviewImage;
import com.bear.whizzle.domain.model.type.Image;
import com.bear.whizzle.reviewimage.repository.ReviewImageRepository;
import java.util.ArrayList;
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

        List<Image> uploadedImages = awsS3Service.uploadReviewImages(reviewImageFiles.toArray(new MultipartFile[0]));
        List<ReviewImage> reviewImages = new ArrayList<>();

        for (Image image :
                uploadedImages) {
            ReviewImage reviewImage = ReviewImage.builder()
                                                 .imageOrder(order++)
                                                 .image(image)
                                                 .review(review)
                                                 .build();

            reviewImage.setReview(review);

            reviewImages.add(reviewImage);
        }

        reviewImageRepository.saveAll(reviewImages);
    }

    private int getLastOrderOfReview(Review review) {
        return reviewImageRepository.findLastOrderByReviewId(review.getId()).orElse(0);
    }

    @Override
    @Transactional
    public void deleteAllReviewImages(Review review, List<Long> deletedReviewImageIds) {
        reviewImageRepository.markDeletedImagesAsDeleted(review.getId(), deletedReviewImageIds);
    }

}
