package com.bear.whizzle.badge;

import com.bear.whizzle.domain.model.entity.Badge;
import com.bear.whizzle.domain.model.type.Image;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
@Disabled("뱃지 데이터 추가를 완료했습니다.")
class SaveBadgeData {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SaveBadgeData(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Test
    void saveBadgeData() {
        List<String> originalNames = List.of("first_diary.png", "fifth_diary.png", "twentyth_diary.png",
                                             "first_review.png", "fifth_review.png", "twentyth_review.png",
                                             "first_keep.png", "tenth_keep.png",
                                             "first_preference.png", "first_daily.png",
                                             "level_50.png", "level_60.png");

        List<String> descriptions = List.of("1번째 다이어리 작성을 축하합니다. 앞으로 달아오를 달력이 기대되네요!",
                                            "벌써 5번째 다이어리를 작성했습니다! 내일은 어떤 새로운 위스키를 마셔볼까요?",
                                            "무려 20번째 다이어리! 어떤 위스키가 가장 매력있었나요?",
                                            "1번째 리뷰 작성 완료! 더 마음에 드는 위스키를 찾아볼까요?",
                                            "5번째 리뷰 작성 완료! 리뷰리뷰리뷰리뷰리뷰",
                                            "20번째 리뷰 작성 완료! 이제 위스키에 정통하셨네요!",
                                            "1번째 위스키를 킵하셨군요. 위스키 넌 내꺼야!",
                                            "10번째 위스키를 킵하셨습니다! 이 중에서 취향에 맞는 위스키는 무엇일까요?",
                                            "환영합니다!! 이제 꼭 맞는 위스키를 찾아볼까요?",
                                            "매일 색다른 위스키도 찾아볼 수 있어요! 오늘은 어떤 위스키가 좋을까~",
                                            "알코올 농도 50% 돌파! 하지만 음주운전은 안 돼요!",
                                            "알코올 농도 60% 돌파! 저도 함께 마시고 싶어요!");

        List<Image> images = originalNames.stream()
                                          .map(originalName -> {
                                              String savedPath = createKey(originalName);
                                              URL url = createUrl(savedPath);
                                              return Image.builder()
                                                          .originalName(originalName)
                                                          .savedPath(savedPath)
                                                          .url(url)
                                                          .build();
                                          })
                                          .collect(Collectors.toList());

        List<Badge> badges = new ArrayList<>();
        for (int size = originalNames.size(), i = 0; i < size; i++) {
            badges.add(
                    Badge.builder()
                         .description(descriptions.get(i))
                         .image(images.get(i))
                         .build()
            );
        }

        bulkInsert(badges);
    }

    private void bulkInsert(List<Badge> badges) {
        final String INSERT_SQL = "INSERT INTO badge (description, original_name, saved_path, url) VALUES (?, ?, ?, ?)";

        jdbcTemplate.batchUpdate(
                INSERT_SQL, badges, badges.size(),
                (preparedStatement, badge) -> {
                    int idx = 0;
                    preparedStatement.setString(++idx, badge.getDescription());
                    preparedStatement.setString(++idx, badge.getImage().getOriginalName());
                    preparedStatement.setString(++idx, badge.getImage().getSavedPath());
                    preparedStatement.setString(++idx, badge.getImage().getUrl().toString());
                }
        );
    }

    private String createKey(String originalName) {
        return "images/badges/" + originalName;
    }

    private URL createUrl(String key) {
        try {
            return new URL("https://half-moon-bear.s3.ap-northeast-2.amazonaws.com/" + key);
        } catch (MalformedURLException e) {
            throw new RuntimeException("이 코드는 실행될 수 없습니다.", e);
        }
    }

}
