package com.bear.whizzle.review.controller.dto;

import java.util.ArrayList;
import java.util.List;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ReviewWriteRequestDto {

    @NotNull
    private Long whiskyId;

    @NotNull
    private Float rating;

    private String content;

    @Size(max = 5, message = "you can upload upto 5 files")
    private List<MultipartFile> reviewImageFiles = new ArrayList<>();

}
