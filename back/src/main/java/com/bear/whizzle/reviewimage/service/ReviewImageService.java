package com.bear.whizzle.reviewimage.service;

import com.bear.whizzle.domain.model.entity.Review;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ReviewImageService {

    void saveAllReviewImages(Review review, List<MultipartFile> reviewImageFiles);

    void deleteAllReviewImages(Review review, List<Long> deletedReviewImageIds);

}
