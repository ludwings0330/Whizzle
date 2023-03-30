package com.bear.whizzle.like;

import com.bear.whizzle.common.util.RandomDataUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@Disabled("회원이 리뷰에 누른 좋아요 데이터 추가 완료")
class SaveLikeData {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void saveLikeData() {
        List<Like> likes = new ArrayList<>();
        final int BATCH_SIZE = 100_000;

        for (long memberId = 1L; memberId < RandomDataUtil.MEMBER_SIZE; memberId++) {
            int likeCnt = (int) (Math.random() * 1_000);
            Set<Long> reviewIds = RandomDataUtil.getReviewIds(likeCnt);

            for (Long reviewId : reviewIds) {
                likes.add(new Like(reviewId, memberId));

                if (likes.size() == BATCH_SIZE) {
                    bulkInsert(likes);
                    likes.clear();
                }
            }
        }

        if (!likes.isEmpty()) {
            bulkInsert(likes);
        }
    }

    void bulkInsert(List<Like> likes) {
        final String INSERT_SQL = "INSERT INTO likes (review_id, member_id, created_date_time) VALUES (?, ?, now())";
        try {
            jdbcTemplate.batchUpdate(
                    INSERT_SQL, likes, likes.size(),
                    (preparedStatement, like) -> {
                        int idx = 0;
                        preparedStatement.setLong(++idx, like.reviewId);
                        preparedStatement.setLong(++idx, like.memberId);
                    }
            );
        } catch (Exception e) {
            System.out.println("예외 발생!");
        }
    }

    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    private static class Like {
        private Long reviewId;
        private Long memberId;
    }

}
