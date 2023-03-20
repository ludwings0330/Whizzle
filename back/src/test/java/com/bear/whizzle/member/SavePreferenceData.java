package com.bear.whizzle.member;

import com.bear.whizzle.common.util.RandomDataUtil;
import com.bear.whizzle.domain.model.type.Age;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.domain.model.type.Gender;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@Disabled("회원의 선호 입맛 데이터 추가 완료")
class SavePreferenceData {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SavePreferenceData(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Test
    void savePreferenceData() {
        List<Preference> preferences = new ArrayList<>();
        final int BATCH_SIZE = 100_000;

        for (long memberId = 1; memberId <= RandomDataUtil.MEMBER_SIZE; memberId++) {
            preferences.add(
                    Preference.builder()
                              .memberId(memberId)
                              .age(RandomDataUtil.getEnum(Age.class))
                              .gender(RandomDataUtil.getEnum(Gender.class))
                              .priceTier((int) (5 * Math.random()) + 1)
                              .flavor(RandomDataUtil.getFlavor())
                              .build()
            );

            if (preferences.size() == BATCH_SIZE) {
                bulkInsert(preferences);
                preferences.clear();
            }
        }

        if (!preferences.isEmpty()) {
            bulkInsert(preferences);
        }
    }

    private void bulkInsert(List<Preference> preferences) {
        final String INSERT_SQL = "INSERT INTO preference (member_id, age, gender, price_tier, smoky, peaty, spicy, herbal, oily, body, rich, sweet, salty, vanilla, tart, fruity, floral, created_date_time, modified_date_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), now())";
        jdbcTemplate.batchUpdate(
                INSERT_SQL, preferences, preferences.size(),
                (preparedStatement, preference) -> {
                    int idx = 0;
                    preparedStatement.setLong(++idx, preference.memberId);
                    preparedStatement.setString(++idx, preference.age.name());
                    preparedStatement.setString(++idx, preference.gender.name());
                    preparedStatement.setInt(++idx, preference.priceTier);

                    Flavor flavor = preference.flavor;
                    preparedStatement.setInt(++idx, flavor.getSmoky());
                    preparedStatement.setInt(++idx, flavor.getPeaty());
                    preparedStatement.setInt(++idx, flavor.getSpicy());
                    preparedStatement.setInt(++idx, flavor.getHerbal());
                    preparedStatement.setInt(++idx, flavor.getOily());
                    preparedStatement.setInt(++idx, flavor.getBody());
                    preparedStatement.setInt(++idx, flavor.getRich());
                    preparedStatement.setInt(++idx, flavor.getSweet());
                    preparedStatement.setInt(++idx, flavor.getSalty());
                    preparedStatement.setInt(++idx, flavor.getVanilla());
                    preparedStatement.setInt(++idx, flavor.getTart());
                    preparedStatement.setInt(++idx, flavor.getFruity());
                    preparedStatement.setInt(++idx, flavor.getFloral());
                }
        );
    }

    @AllArgsConstructor
    @Builder
    private static class Preference {

        private Long memberId;
        private Gender gender;
        private Age age;
        private Integer priceTier;
        private Flavor flavor;

    }

}
