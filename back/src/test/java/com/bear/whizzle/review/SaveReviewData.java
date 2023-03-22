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
@Disabled("리뷰 데이터 추가 완료")
class SaveReviewData {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void saveReviewData() {
        List<Review> reviews = new ArrayList<>();
        final int BATCH_SIZE = 100_000;

        for (long memberId = 1; memberId <= RandomDataUtil.MEMBER_SIZE; memberId++) {
            int reviewCnt = (int) (10 * Math.random());
            Set<Long> whiskyIds = RandomDataUtil.getWhiskeyIds(reviewCnt);

            for (Long whiskyId : whiskyIds) {
                reviews.add(
                        Review.builder()
                              .memberId(memberId)
                              .whiskyId(whiskyId)
                              .rating(RandomDataUtil.getRating())
                              .content(RandomDataUtil.getContent())
                              .build()
                );

                if (reviews.size() == BATCH_SIZE) {
                    bulkInsert(reviews);
                    reviews.clear();
                }
            }
        }

        if (!reviews.isEmpty()) {
            bulkInsert(reviews);
        }
    }

    private void bulkInsert(List<Review> reviews) {
        final String INSERT_SQL = "INSERT INTO review (member_id, whisky_id, rating, content, created_date_time, modified_date_time) VALUES (?, ?, ?, ?, now(), now())";
        jdbcTemplate.batchUpdate(
                INSERT_SQL, reviews, reviews.size(),
                (preparedStatement, review) -> {
                    int idx = 0;
                    preparedStatement.setLong(++idx, review.memberId);
                    preparedStatement.setLong(++idx, review.whiskyId);
                    preparedStatement.setFloat(++idx, review.rating);
                    preparedStatement.setString(++idx, review.content);
                }
        );
    }

    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    private static class Review {

        private Long memberId;
        private Long whiskyId;
        private Float rating;
        private String content;

    }

}
