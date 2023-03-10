package com.bear.whizzle.common.config;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AwsS3Config {

    @Bean
    public BasicAWSCredentials basicAWSCredentials(
            @Value("${cloud.aws.credentials.access-key}") String accessKey,
            @Value("${cloud.aws.credentials.secret-key}") String secretKey
    ) {
        return new BasicAWSCredentials(accessKey, secretKey);
    }

    @Bean
    public AWSCredentialsProvider awsCredentialsProvider(BasicAWSCredentials basicAWSCredentials) {
        return new AWSStaticCredentialsProvider(basicAWSCredentials);
    }

    @Bean
    public AmazonS3 amazonS3(
            AWSCredentialsProvider awsCredentialsProvider,
            @Value("${cloud.aws.region.static}") String region
    ) {
        return AmazonS3Client.builder()
                .withRegion(region)
                .withCredentials(awsCredentialsProvider)
                .build();
    }

}
