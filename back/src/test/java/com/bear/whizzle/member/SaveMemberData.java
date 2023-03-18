package com.bear.whizzle.member;

import static com.bear.whizzle.common.util.RandomDataUtil.MEMBER_SIZE;

import com.bear.whizzle.common.util.RandomDataUtil;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.type.Image;
import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@Disabled("회원 데이터 추가를 완료했습니다.")
class SaveMemberData {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SaveMemberData(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Test
    void saveMemberData() {
        List<Member> members = new ArrayList<>();

        for (int i = 0; i < MEMBER_SIZE; i++) {
            String provider = RandomDataUtil.getProvider();
            members.add(
                    Member.builder()
                          .provider(provider)
                          .email(RandomDataUtil.getEmail(provider))
                          .nickname(RandomDataUtil.getLowerAlphabet((int) (8 * Math.random()) + 5))
                          .build()
            );
        }

        bulkInsert(members);
    }

    private void bulkInsert(List<Member> members) {
        final String INSERT_SQL = "INSERT INTO member (email, provider, nickname, original_name, saved_path, url, created_date_time) VALUES (?, ?, ?, ?, ?, ?, now())";
        jdbcTemplate.batchUpdate(
                INSERT_SQL, members, members.size(),
                (preparedStatement, member) -> {
                    Image image = Image.getDefaultMemberImage();
                    int idx = 0;
                    preparedStatement.setString(++idx, member.getEmail());
                    preparedStatement.setString(++idx, member.getProvider());
                    preparedStatement.setString(++idx, member.getNickname());
                    preparedStatement.setString(++idx, image.getOriginalName());
                    preparedStatement.setString(++idx, image.getSavedPath());
                    preparedStatement.setString(++idx, image.getUrl().toString());
                }
        );
    }

}
