package com.bear.whizzle.review;

import com.bear.whizzle.common.util.RandomDataUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@Disabled("리뷰 이미지 데이터 추가 완료")
class SaveReviewImageData {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void saveReviewImageData() {
        List<ReviewImage> reviewImages = new ArrayList<>();
        final int BATCH_SIZE = 100_000;

        for (long reviewId = 1; reviewId <= RandomDataUtil.REVIEW_SIZE; reviewId++) {
            int imageCnt = (int) (6 * Math.random());
            Set<Long> whiskyIds = RandomDataUtil.getWhiskeyIds(imageCnt);

            for (Long whiskyId : whiskyIds) {
                String originalName = "NO_" + whiskyId + ".png";
                String key = "images/whiskies/" + originalName;
                String url = "https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/" + key;

                reviewImages.add(
                        ReviewImage.builder()
                                   .reviewId(reviewId)
                                   .savedPath(key)
                                   .originalName(originalName)
                                   .url(url)
                                   .imageOrder(--imageCnt)
                                   .build()
                );

                if (reviewImages.size() == BATCH_SIZE) {
                    bulkInsert(reviewImages);
                    reviewImages.clear();
                }
            }
        }

        if (!reviewImages.isEmpty()) {
            bulkInsert(reviewImages);
        }
    }

    private void bulkInsert(List<ReviewImage> reviewImages) {
        final String INSERT_SQL = "INSERT INTO review_image (review_id, saved_path, original_name, url, image_order) VALUES (?, ?, ?, ?, ?)";
        jdbcTemplate.batchUpdate(
                INSERT_SQL, reviewImages, reviewImages.size(),
                (preparedStatement, reviewImage) -> {
                    int idx = 0;
                    preparedStatement.setLong(++idx, reviewImage.reviewId);
                    preparedStatement.setString(++idx, reviewImage.savedPath);
                    preparedStatement.setString(++idx, reviewImage.originalName);
                    preparedStatement.setString(++idx, reviewImage.url);
                    preparedStatement.setInt(++idx, reviewImage.imageOrder);
                }
        );
    }

    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    private static class ReviewImage {

        private Long reviewId;
        private String savedPath;
        private String originalName;
        private String url;
        private Integer imageOrder;

    }

}
