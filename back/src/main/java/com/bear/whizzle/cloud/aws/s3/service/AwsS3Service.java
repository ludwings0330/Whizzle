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
     *
     * @param file 저장할 1개의 프로필 사진
     * @return Image 객체를 반환합니다. 이 객체는 {@code S3Object}에 대한 기본 정보(이름, 경로, URL)를 담고 있습니다.
     */
    public Image uploadMemberProfile(MultipartFile file) {
        return upload(file, "images/members");
    }

    /**
     * 리뷰 이미지를 저장합니다. 리뷰 이미지를 저장하는 도중에 실패할 경우 이전까지 저장한 이미지를 롤백하지는 않습니다.
     *
     * @param files 저장할 1개 이상의 리뷰 이미지 사진
     * @return Image 객체의 리스트를 반환합니다. 이 객체는 {@code S3Object}에 대한 기본 정보(이름, 경로, URL)를 담고 있습니다.
     */
    public List<Image> uploadReviewImages(List<MultipartFile> files) {
        List<Image> images = new ArrayList<>();

        for (MultipartFile file : files) {
            images.add(upload(file, "images/reviews"));
        }

        return images;
    }

    /**
     * S3에 저장된 파일을 다운로드합니다.
     *
     * @param key S3에서 파일이 저장된 경로
     * @return 파일을 byte 배열로 반환합니다. 파일의 타입은 key를 파싱하여 얻어야 합니다.
     * @throws UncheckedIOException 파일을 다운로드하여 byte 배열로 변환하는 중에 이 예외가 발생할 수 있습니다.
     */
    public byte[] downloadFile(String key) {
        try (S3ObjectInputStream inputStream = amazonS3.getObject(this.bucketName, key)
                                                       .getObjectContent()) {
            return IOUtils.toByteArray(inputStream);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    /**
     * S3에 저장된 파일을 삭제합니다.
     *
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
