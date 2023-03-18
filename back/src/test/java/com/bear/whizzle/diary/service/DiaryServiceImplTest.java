package com.bear.whizzle.diary.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import com.bear.whizzle.diary.DiaryMapper;
import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.repository.DiaryRepository;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Diary;
import com.bear.whizzle.domain.model.type.DrinkLevel;
import com.bear.whizzle.domain.model.type.Emotion;
import java.time.LocalDate;
import java.util.List;
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
        // given
        Long memberId = 1L;
        DiaryRequestSaveDto request = DiaryRequestSaveDto.builder()
                                                         .date(LocalDate.now())
                                                         .whiskyIds(List.of(1L, 2L, 3L))
                                                         .emotion(Emotion.GOOD)
                                                         .drinkLevel(DrinkLevel.HEAVY)
                                                         .content("기분이 매우매우 조으다.")
                                                         .build();

        // when
        diaryService.writeDiary(memberId, request);

        // then
        entityManager.flush();
        entityManager.clear();
        Diary written = diaryRepository.findByMemberId(memberId)
                                       .stream()
                                       .filter(diary -> diary.getDate().equals(LocalDate.now()))
                                       .findFirst()
                                       .orElseThrow(() -> new NotFoundException("다이어리 작성 실패"));

        assertThat(written.getMember().getId()).isEqualTo(memberId);
        assertThat(DiaryMapper.toDiaryRequestSaveDto(written)).isEqualTo(request);
    }

}