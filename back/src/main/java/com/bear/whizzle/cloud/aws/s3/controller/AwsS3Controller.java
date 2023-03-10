package com.bear.whizzle.cloud.aws.s3.controller;

import com.bear.whizzle.cloud.aws.s3.service.AwsS3Service;
import com.bear.whizzle.domain.model.type.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/aws/s3")
@RequiredArgsConstructor
public class AwsS3Controller {

    private final AwsS3Service awsS3Service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public String test() {
        return "in aws/s3";
    }

    @PostMapping("/image")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Image upload(@RequestPart("image") MultipartFile multipartFile) {
        return awsS3Service.upload(multipartFile, "image");
    }

    @DeleteMapping("/image")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public String remove(@RequestParam String originalName) {
        awsS3Service.remove("image", originalName);
        return "삭제 성공";
    }

}
