package com.bear.whizzle.cloud.aws.s3.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.bear.whizzle.domain.model.type.Image;
import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

@Service
public class AwsS3Service {

    private final AmazonS3 amazonS3;
    private final String bucketName;

    @Autowired
    public AwsS3Service(AmazonS3 amazonS3, @Value("${cloud.aws.s3.bucket}") String bucketName) {
        this.amazonS3 = amazonS3;
        this.bucketName = bucketName;
    }

    /**
     * 멤버의 프로필 사진을 저장합니다.
     * @param file 저장할 1개의 프로필 사진
     * @return Image 객체를 반환합니다. 이 객체는 S3 Object에 대한 기본 정보를 담고 있습니다.
     */
    public Image uploadMemberProfile(MultipartFile file) {
        return upload(file, "images/members");
    }

    /**
     * S3에 저장된 파일을 삭제합니다.
     * @param key S3에서 파일이 저장된 경로
     */
    public void deleteFile(String key) {
        amazonS3.deleteObject(this.bucketName, key);
    }

    private Image upload(MultipartFile multipartFile, String dirName) {
        String originalName = multipartFile.getOriginalFilename();
        String key = createKey(dirName, originalName);
        ObjectMetadata metadata = getObjectMetadata(multipartFile);

        try (InputStream input = multipartFile.getInputStream()) {
            amazonS3.putObject(
                    new PutObjectRequest(
                            this.bucketName, key, input, metadata
                    ).withCannedAcl(CannedAccessControlList.PublicRead)
            );
        } catch (IOException e) {
            throw new IllegalArgumentException("업로드 하려는 파일을 읽을 수 없습니다.", e);
        }

        return Image.builder()
                    .originalName(originalName)
                    .savedPath(key)
                    .url(amazonS3.getUrl(this.bucketName, key))
                    .build();
    }

    private String createKey(String dirName, String originalName) {
        return dirName + "/" + UUID.randomUUID() + "_" + originalName;
    }

    private ObjectMetadata getObjectMetadata(MultipartFile multipartFile) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(multipartFile.getContentType());
        metadata.setContentLength(multipartFile.getSize());
        return metadata;
    }

}
