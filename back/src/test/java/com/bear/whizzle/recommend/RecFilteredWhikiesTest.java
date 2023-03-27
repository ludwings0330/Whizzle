package com.bear.whizzle.recommend;

import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.recommend.service.RecService;
import com.bear.whizzle.whisky.repository.WhiskyCustomRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RecFilteredWhikiesTest {

    @Autowired
    private RecService recService;
    @Autowired
    private WhiskyCustomRepository whiskyCustomRepository;

    @Value("${app.rec.topK}")
    private Integer topK;

    @Test
    @DisplayName("가격대 필터링 테스트")
    void filteredWhiskiesTest() {
        // given
        // Create a list of Long integers from 1 to 3535
        List<Long> numbers = new ArrayList<>();
        for (long i = 1; i <= 3535; i++) {
            numbers.add(i);
        }

        // Shuffle the list randomly
        Collections.shuffle(numbers);
        Integer priceTier = 4;

        // when
        List<Long> filteredWhiskies = recService.filterByPriceTier(numbers, priceTier);
        List<Whisky> whiskies = new ArrayList<>(whiskyCustomRepository.findByIds(filteredWhiskies).values());

        // then
        Assertions.assertThat(filteredWhiskies).hasSize(topK);
        whiskies.forEach(w -> {
            Assertions.assertThat(w.getPriceTier()).isEqualTo(priceTier);
        });
    }

}
