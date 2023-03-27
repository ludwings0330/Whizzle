package com.bear.whizzle.keep;

import static com.bear.whizzle.common.util.RandomDataUtil.MEMBER_SIZE;

import com.bear.whizzle.common.util.RandomDataUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@Disabled("회원이 위스키를 킵한 데이터 추가를 완료했습니다.")
class SaveKeepData {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SaveKeepData(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Test
    void saveKeepData() {
        List<List<Long>> keepIds = new ArrayList<>();
        final int BATCH_SIZE = 100_000;

        for (long memberId = 1; memberId <= MEMBER_SIZE; memberId++) {
            int keepCount = (int) (100 * Math.random());
            Set<Long> whiskyIds = RandomDataUtil.getWhiskeyIds(keepCount);

            for (Long whiskyId : whiskyIds) {
                keepIds.add(List.of(memberId, whiskyId));

                if (keepIds.size() == BATCH_SIZE) {
                    bulkInsert(keepIds);
                    keepIds.clear();
                }
            }
        }

        if (!keepIds.isEmpty()) {
            bulkInsert(keepIds);
        }
    }

    private void bulkInsert(List<List<Long>> keepIds) {
        final String INSERT_SQL = "INSERT INTO keep (member_id, whisky_id, created_date_time) VALUES (?, ?, now())";
        jdbcTemplate.batchUpdate(
                INSERT_SQL, keepIds, keepIds.size(),
                (preparedStatement, keepId) -> {
                    int idx = 0;
                    preparedStatement.setLong(++idx, keepId.get(0));
                    preparedStatement.setLong(++idx, keepId.get(1));
                }
        );
    }

}
