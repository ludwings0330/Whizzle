package com.bear.whizzle.review.controller.dto;

import java.util.List;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ReviewUpdateRequestDto {

    private Float rating;
    private String content;
    private List<Long> deletedReviewImageIds;
    private List<MultipartFile> addedReviewImageFiles;

}
