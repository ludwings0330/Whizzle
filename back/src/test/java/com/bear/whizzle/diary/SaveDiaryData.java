package com.bear.whizzle.diary;

import com.bear.whizzle.common.util.RandomDataUtil;
import com.bear.whizzle.domain.model.type.DrinkLevel;
import com.bear.whizzle.domain.model.type.Emotion;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@Disabled("위스키 다이어리 데이터 추가를 완료했습니다.")
class SaveDiaryData {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SaveDiaryData(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Test
    void saveDiaryData() {
        List<Diary> diaries = new ArrayList<>();
        final int BATCH_SIZE = 100_000;

        for (long memberId = 1; memberId <= RandomDataUtil.MEMBER_SIZE; memberId++) {
            int diaryCount = (int) (100 * Math.random());
            LocalDateTime today = LocalDateTime.now();

            for (int i = 0; i < diaryCount; i++) {
                diaries.add(
                        Diary.builder()
                             .memberId(memberId)
                             .emotion(RandomDataUtil.getEmotion())
                             .drinkLevel(RandomDataUtil.getDrinkLevel())
                             .content(RandomDataUtil.getContent())
                             .createdDateTime(today.minusDays(i))
                             .build()
                );

                if (diaries.size() == BATCH_SIZE) {
                    bulkInsert(diaries);
                    diaries.clear();
                }
            }
        }

        if (!diaries.isEmpty()) {
            bulkInsert(diaries);
        }
    }

    private void bulkInsert(List<Diary> diaries) {
        final String INSERT_SQL = "INSERT INTO diary (member_id, emotion, drink_level, content, created_date_time, modified_date_time) VALUES (?, ?, ?, ?, ?, ?)";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'hh-mm-ss");

        jdbcTemplate.batchUpdate(
                INSERT_SQL, diaries, diaries.size(),
                (preparedStatement, diary) -> {
                    int idx = 0;
                    preparedStatement.setLong(++idx, diary.memberId);
                    preparedStatement.setString(++idx, diary.emotion.name());
                    preparedStatement.setString(++idx, diary.drinkLevel.name());
                    preparedStatement.setString(++idx, diary.content);

                    String createdDateTime = diary.createdDateTime.format(formatter);
                    preparedStatement.setString(++idx, createdDateTime);
                    preparedStatement.setString(++idx, createdDateTime);
                }
        );
    }

    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @Getter
    @Builder
    private static class Diary {
        private long memberId;
        private Emotion emotion;
        private DrinkLevel drinkLevel;
        private String content;
        private LocalDateTime createdDateTime;
        private LocalDateTime modifiedDateTime;
    }

}
