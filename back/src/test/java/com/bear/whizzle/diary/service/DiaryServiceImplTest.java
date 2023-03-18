package com.bear.whizzle.diary.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.bear.whizzle.diary.DiaryMapper;
import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.controller.dto.DiaryRequestUpdateDto;
import com.bear.whizzle.diary.repository.DiaryRepository;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Diary;
import com.bear.whizzle.domain.model.entity.Drink;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.DrinkLevel;
import com.bear.whizzle.domain.model.type.Emotion;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Slf4j
class DiaryServiceImplTest {

    @Autowired
    private DiaryService diaryService;

    @Autowired
    private DiaryRepository diaryRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    @DisplayName("다이어리 작성 테스트")
    void writeDiary() {
        //given
        Long memberId = 1L;
        DiaryRequestSaveDto saveDto = DiaryRequestSaveDto.builder()
                                                         .date(LocalDate.now())
                                                         .whiskyIds(List.of(1L, 2L, 3L))
                                                         .emotion(Emotion.GOOD)
                                                         .drinkLevel(DrinkLevel.HEAVY)
                                                         .content("기분이 매우매우 조으다.")
                                                         .build();

        //when
        diaryService.writeDiary(memberId, saveDto);

        //then
        entityManager.flush();
        entityManager.clear();
        Diary written = diaryRepository.findByMemberId(memberId)
                                       .stream()
                                       .filter(diary -> diary.getDate().equals(LocalDate.now()))
                                       .findFirst()
                                       .orElseThrow(() -> new NotFoundException("다이어리 작성 실패"));

        assertThat(written.getMember().getId()).isEqualTo(memberId);
        assertThat(DiaryMapper.toDiaryRequestSaveDto(written)).isEqualTo(saveDto);
    }

    @Test
    @DisplayName("다이어리 수스 테스트_성공")
    void rewriteDiary() {
        //given
        Long memberId = 1L;
        Long diaryId = 1L;
        List<Integer> deletedDrinkOrders = List.of(0);
        List<Long> insertedWhiskyIds = List.of(0L, 1L, 2L);
        DiaryRequestUpdateDto updateDto = DiaryRequestUpdateDto.builder()
                                                               .id(diaryId)
                                                               .emotion(Emotion.GOOD)
                                                               .drinkLevel(DrinkLevel.LIGHT)
                                                               .content("정상 작동")
                                                               .deletedDrinkOrders(deletedDrinkOrders)
                                                               .insertedWhiskyIds(insertedWhiskyIds)
                                                               .build();

        //when
        diaryService.rewriteDiary(memberId, updateDto);

        //then
        entityManager.flush();
        entityManager.clear();
        Diary updated = diaryRepository.findWithDrinksById(diaryId)
                                       .orElseThrow(() -> new NotFoundException("다른 다이어리 ID로 테스트를 진행해주세요."));

        assertThat(updated.getMember().getId()).isEqualTo(memberId);
        assertThat(DiaryMapper.toDiaryRequestUpdateDto(updated)).isEqualTo(updateDto);

        assertThat(updated.getDrinks()
                           .stream()
                           .map(Drink::getDrinkOrder)
                           .filter(deletedDrinkOrders::contains)
                           .collect(Collectors.toList()))
                .isEqualTo(deletedDrinkOrders);

        assertThat(updated.getDrinks()
                          .stream()
                          .map(Drink::getWhisky)
                          .map(Whisky::getId)
                          .filter(insertedWhiskyIds::contains)
                          .collect(Collectors.toList()))
                .isEqualTo(insertedWhiskyIds);
    }

}