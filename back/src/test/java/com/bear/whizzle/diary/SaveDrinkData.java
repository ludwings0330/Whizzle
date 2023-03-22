package com.bear.whizzle.diary;

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
@Disabled("다이어리에 작성한 마신 위스키 데이터 저장")
class SaveDrinkData {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SaveDrinkData(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Test
    void saveDrinkData() {
        List<Drink> drinks = new ArrayList<>();
        final int BATCH_SIZE = 100_000;

        for (long diaryId = 1; diaryId <= RandomDataUtil.DIARY_SIZE; diaryId++) {
            int whiskyCnt = (int) (3 * Math.random()) + 1;
            Set<Long> whiskeyIds = RandomDataUtil.getWhiskeyIds(whiskyCnt);

            int idx = 0;
            for (Long whiskeyId : whiskeyIds) {
                drinks.add(
                        Drink.builder()
                             .diaryId(diaryId)
                             .whiskyId(whiskeyId)
                             .drinkOrder(idx++)
                             .build()
                );

                if (drinks.size() == BATCH_SIZE) {
                    bulkInsert(drinks);
                    drinks.clear();
                }
            }
        }

        if (!drinks.isEmpty()) {
            bulkInsert(drinks);
        }
    }

    private void bulkInsert(List<Drink> drinks) {
        final String INSERT_SQL = "INSERT INTO drink (diary_id, whisky_id, drink_order) VALUES (?, ?, ?)";
        jdbcTemplate.batchUpdate(
                INSERT_SQL, drinks, drinks.size(),
                (preparedStatement, drink) -> {
                    int idx = 0;
                    preparedStatement.setLong(++idx, drink.diaryId);
                    preparedStatement.setLong(++idx, drink.whiskyId);
                    preparedStatement.setInt(++idx, drink.drinkOrder);
                }
        );
    }

    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Builder
    private static class Drink {
        private Long diaryId;
        private Long whiskyId;
        private Integer drinkOrder;
    }

}
