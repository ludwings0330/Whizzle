package com.bear.whizzle.diary.controller;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.common.util.JwtUtil;
import com.bear.whizzle.diary.DiaryMapper;
import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.controller.dto.DiaryRequestUpdateDto;
import com.bear.whizzle.diary.controller.dto.DiaryResponseDto;
import com.bear.whizzle.diary.repository.DiaryRepository;
import com.bear.whizzle.diary.service.DiaryService;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Diary;
import com.bear.whizzle.domain.model.entity.Drink;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.DrinkLevel;
import com.bear.whizzle.domain.model.type.Emotion;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Slf4j
class DiaryControllerTest {

    private static final Long TEST_MEMBER_ID = 1L;
    private static String TOKEN;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DiaryService diaryService;

    @Autowired
    private DiaryRepository diaryRepository;

    @BeforeEach
    void beforeEach() {
        if (TOKEN == null) {
            TOKEN = jwtUtil.generateToken(PrincipalDetails.builder()
                                                          .memberId(TEST_MEMBER_ID)
                                                          .build(),
                                          30 * 60 * 60 * 1000);
        }

        diaryService.writeDiary(
                TEST_MEMBER_ID,
                DiaryRequestSaveDto.builder()
                                   .date(LocalDate.now().plusDays(1L))
                                   .whiskyIds(List.of(1L, 2L, 3L))
                                   .emotion(Emotion.GOOD)
                                   .drinkLevel(DrinkLevel.HEAVY)
                                   .content("기분이 매우매우 조으다.")
                                   .build()
        );
    }

    @Test
    @DisplayName("특정 월의 다이어리 목록 조회 테스트")
    void readDiaries() throws Exception {
        // given
        final String token = jwtUtil.generateToken(PrincipalDetails.builder()
                                                                   .memberId(TEST_MEMBER_ID)
                                                                   .build(),
                                                   30 * 60 * 60 * 1000);

        String month = "2023-03";

        // when
        String content = mockMvc.perform(
                                        get("/api/diaries")
                                                .header("Authorization", "Bearer " + token)
                                                .queryParam("month", month)
                                )
                                .andExpect(status().isOk())
                                .andReturn()
                                .getResponse()
                                .getContentAsString();

        // then
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
        objectMapper.readValue(content, new TypeReference<List<DiaryResponseDto>>() {})
                    .forEach(actual -> assertThat(actual.getDate().format(formatter)).isEqualTo(month));
    }

    @Test
    @DisplayName("다이어리 작성 테스트")
    void writeDiary() throws Exception {
        // given
        DiaryRequestSaveDto saveDto = DiaryRequestSaveDto.builder()
                                                         .date(LocalDate.now())
                                                         .whiskyIds(List.of(1L, 2L, 3L))
                                                         .emotion(Emotion.GOOD)
                                                         .drinkLevel(DrinkLevel.HEAVY)
                                                         .content("기분이 매우매우 조으다.")
                                                         .build();

        // when
        mockMvc.perform(
                post("/api/diaries")
                        .header("Authorization", "Bearer " + TOKEN)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(saveDto))
        ).andExpect(status().isCreated());

        // then
        Diary written = diaryRepository.findByMemberIdAndDate(TEST_MEMBER_ID, LocalDate.now())
                                       .orElseThrow(() -> new NotFoundException("다이어리 작성 실패"));

        assertThat(DiaryMapper.toDiaryRequestSaveDto(written)).isEqualTo(saveDto);
    }

    @Test
    @DisplayName("다이어리 수정 테스트_성공")
    void rewriteDiary_success() throws Exception {
        // given
        String token = jwtUtil.generateToken(PrincipalDetails.builder()
                                                             .memberId(TEST_MEMBER_ID)
                                                             .build(),
                                             30 * 60 * 60 * 1000);

        Long diaryId = diaryRepository.findByMemberIdAndDate(TEST_MEMBER_ID, LocalDate.now().plusDays(1L))
                                      .orElseThrow()
                                      .getId();

        List<Integer> deletedDrinkOrders = List.of(0);
        List<Long> insertedWhiskyIds = List.of(0L, 4L, 5L);
        DiaryRequestUpdateDto updateDto = DiaryRequestUpdateDto.builder()
                                                               .id(diaryId)
                                                               .emotion(Emotion.GOOD)
                                                               .drinkLevel(DrinkLevel.LIGHT)
                                                               .content("정상 작동")
                                                               .deletedDrinkOrders(deletedDrinkOrders)
                                                               .insertedWhiskyIds(insertedWhiskyIds)
                                                               .build();

        // when
        mockMvc.perform(
                put("/api/diaries")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDto))
        ).andExpect(status().isCreated());

        // then
        Diary updated = diaryRepository.findWithDrinksById(diaryId)
                                       .orElseThrow();

        assertThat(DiaryMapper.toDiaryRequestUpdateDto(updated)).isEqualTo(updateDto);
        assertThat(updated.getDrinks()
                          .stream()
                          .filter(Drink::getIsDeleted)
                          .map(Drink::getDrinkOrder)
                          .filter(deletedDrinkOrders::contains)
                          .collect(Collectors.toList()))
                .isEqualTo(deletedDrinkOrders);

        assertThat(updated.getDrinks()
                          .stream()
                          .filter(drink -> !drink.getIsDeleted())
                          .map(Drink::getWhisky)
                          .map(Whisky::getId)
                          .filter(insertedWhiskyIds::contains)
                          .collect(Collectors.toList()))
                .isEqualTo(insertedWhiskyIds);
    }

    @Test
    @DisplayName("다이어리 삭제 테스트_성공")
    void eraseDiary_success() throws Exception {
        // given
        String token = jwtUtil.generateToken(PrincipalDetails.builder()
                                                             .memberId(TEST_MEMBER_ID)
                                                             .build(),
                                             30 * 60 * 60 * 1000);

        Long diaryId = diaryRepository.findByMemberIdAndDate(TEST_MEMBER_ID, LocalDate.now().plusDays(1L))
                                      .orElseThrow()
                                      .getId();

        // when
        mockMvc.perform(
                delete("/api/diaries/" + diaryId)
                        .header("Authorization", "Bearer " + token)
        ).andExpect(status().isCreated());

        // then
        Diary deleted = diaryRepository.findWithDrinksById(diaryId)
                                       .orElseThrow();

        assertThat(deleted.getIsDeleted()).isTrue();
        assertThat(deleted.getDrinks()
                          .stream()
                          .filter(Drink::getIsDeleted)
                          .count())
                .isEqualTo(deleted.getDrinks().size());
    }

    @Test
    @DisplayName("다이어리 수정 및 삭제 인가_실패")
    void authorizeWriter_fail() {
        // given
        Long memberId = 2L;
        Long diaryId = diaryRepository.findByMemberIdAndDate(TEST_MEMBER_ID, LocalDate.now().plusDays(1L))
                                      .orElseThrow()
                                      .getId();

        // then
        assertThatThrownBy(() -> diaryService.eraseDiary(memberId, diaryId)).isInstanceOf(AccessDeniedException.class);
    }

}