package com.bear.whizzle.whisky;

import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.keep.repository.KeepCustomRepository;
import com.bear.whizzle.recommend.RecommendWhiskyMapper;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyResponseDto;
import com.bear.whizzle.whisky.repository.WhiskyCustomRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class RecWhiskyResponseTest {

    @Autowired
    private WhiskyCustomRepository whiskyCustomRepository;

    @Autowired
    private KeepCustomRepository keepCustomRepository;


    @Test
    @DisplayName("추천받은 위스키 정보 조회 테스트")
    void recWhiskyTest() {
        // given
        List<Long> recWhiskies = List.of(29L, 1L, 10L, 45L, 505L, 477L, 616L, 770L);
        Long memberId = 1L;

        // when
        Map<Long, Whisky> whiskies = whiskyCustomRepository.findByIds(recWhiskies);
        Map<Long, Boolean> myKeeps = keepCustomRepository.whetherKeep(recWhiskies, memberId);
        List<RecWhiskyResponseDto> recWhiskyResponseDtos = new ArrayList<>();
        recWhiskies.forEach(r -> recWhiskyResponseDtos.add(RecommendWhiskyMapper.toWhiskyResponseDto(whiskies.get(r), myKeeps.containsKey(r), RecWhiskyResponseDto.class)));
        // then
        Assertions.assertThat(recWhiskyResponseDtos).hasSameSizeAs(recWhiskies);
    }

}
