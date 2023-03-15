package com.bear.whizzle.cloud.aws.s3.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.bear.whizzle.domain.model.type.Image;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AwsS3Service {

    private final AmazonS3 amazonS3;
    private final String bucketName;

    @Autowired
    public AwsS3Service(AmazonS3 amazonS3, @Value("${cloud.aws.s3.bucket}") String bucketName) {
        this.amazonS3 = amazonS3;
        this.bucketName = bucketName;
    }

    public Image upload(MultipartFile multipartFile, String dirName) {
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
//                    .url(amazonS3.getUrl(this.bucketName, key))
                    .build();
    }

    public void remove(String dirName, String originalName) {
        String key = createKey(dirName, originalName);
        amazonS3.deleteObject(this.bucketName, key);
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
