package com.bear.whizzle.member;

import static com.bear.whizzle.common.util.RandomDataUtil.MEMBER_SIZE;

import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@Disabled("멤버가 가지고 있는 뱃지 데이터 추가 완료")
class SaveMemberHasBadgeData {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SaveMemberHasBadgeData(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Test
    void saveMemberHasBadgeData() {
        List<List<Long>> badgeCategories = List.of(
                List.of(1L, 2L, 3L),
                List.of(4L, 5L, 6L),
                List.of(7L, 8L),
                List.of(9L),
                List.of(10L)
        );
        
        int batchSize = MEMBER_SIZE / 5;
        for (int i = 0; i < 5; i++) {
            List<List<Long>> memberHasBadgeIds = new ArrayList<>();

            for (long memberId = 1 + i * batchSize; memberId <= (i + 1) * batchSize; memberId++) {
                gainBadges(memberHasBadgeIds, badgeCategories, memberId);
            }

            bulkInsert(memberHasBadgeIds);
        }
    }

    private static void gainBadges(List<List<Long>> memberHasBadgeIds, List<List<Long>> badgeCategories, long memberId) {
        for (List<Long> badgeIds : badgeCategories) {
            int gained = (int) ((badgeIds.size() + 1) * Math.random());

            for (int i = 0; i < gained; i++) {
                memberHasBadgeIds.add(List.of(memberId, badgeIds.get(i)));
            }
        }
    }

    private void bulkInsert(List<List<Long>> memberHasBadgeIds) {
        final String INSERT_SQL = "INSERT INTO member_has_badge (member_id, badge_id, created_date_time) VALUES (?, ?, now())";
        jdbcTemplate.batchUpdate(
                INSERT_SQL, memberHasBadgeIds, memberHasBadgeIds.size(),
                (preparedStatement, memberHasBadgeId) -> {
                    int idx = 0;
                    preparedStatement.setLong(++idx, memberHasBadgeId.get(0));
                    preparedStatement.setLong(++idx, memberHasBadgeId.get(1));
                }
        );
    }

}
