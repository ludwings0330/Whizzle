package com.bear.whizzle.diary.controller;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
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
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Slf4j
class DiaryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DiaryRepository diaryRepository;

    private Long testMemberId;
    private String testToken;
    private Long testDiaryId;

    @BeforeEach
    void beforeEach() {
        testMemberId = 1L;
        testToken = jwtUtil.generateToken(PrincipalDetails.builder().memberId(testMemberId).build(), 5000);
        testDiaryId = 1L;
    }

    @Test
    @DisplayName("특정 월의 다이어리 목록 조회 테스트")
    void readDiaries() throws Exception {
        // given
        String month = "2023-03";

        // when
        String content = mockMvc.perform(
                                        get("/api/diaries")
                                                .header("Authorization", "Bearer " + testToken)
                                                .queryParam("month", month)
                                )
                                .andExpect(status().isOk())
                                .andReturn()
                                .getResponse()
                                .getContentAsString();

        // then
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
        objectMapper.readValue(content, new TypeReference<List<DiaryResponseDto>>() {
                    })
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
                        .header("Authorization", "Bearer " + testToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(saveDto))
        ).andExpect(status().isCreated());

        // then
        assertThatCode(
                () -> {
                    Diary actual = diaryRepository.findByMemberIdAndDate(testMemberId, LocalDate.now()).get();
                    assertThat(DiaryMapper.toDiaryRequestSaveDto(actual)).isEqualTo(saveDto);
                }
        ).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("다이어리 수정 테스트_성공")
    void rewriteDiary_success() throws Exception {
        // given
        List<Integer> deletedDrinkOrders = List.of(0);
        List<Long> insertedWhiskyIds = List.of(0L, 4L, 5L);
        DiaryRequestUpdateDto updateDto = DiaryRequestUpdateDto.builder()
                                                               .id(testDiaryId)
                                                               .emotion(Emotion.GOOD)
                                                               .drinkLevel(DrinkLevel.LIGHT)
                                                               .content("정상 작동")
                                                               .deletedDrinkOrders(deletedDrinkOrders)
                                                               .insertedWhiskyIds(insertedWhiskyIds)
                                                               .build();

        // when
        mockMvc.perform(
                put("/api/diaries/" + testDiaryId)
                        .header("Authorization", "Bearer " + testToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDto))
        ).andExpect(status().isCreated());

        // then
        assertThatCode(
                () -> {
                    Diary actual = diaryRepository.findWithDrinksById(testDiaryId).get();

                    assertThat(DiaryMapper.toDiaryRequestUpdateDto(actual)).isEqualTo(updateDto);
                    assertThat(actual.getDrinks()
                                     .stream()
                                     .filter(Drink::isDeleted)
                                     .map(Drink::getDrinkOrder)
                                     .filter(deletedDrinkOrders::contains)
                                     .collect(Collectors.toList()))
                            .isEqualTo(deletedDrinkOrders);

                    assertThat(actual.getDrinks()
                                     .stream()
                                     .filter(drink -> !drink.isDeleted())
                                     .map(Drink::getWhisky)
                                     .map(Whisky::getId)
                                     .filter(insertedWhiskyIds::contains)
                                     .collect(Collectors.toList()))
                            .isEqualTo(insertedWhiskyIds);
                }
        ).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("다이어리 삭제 테스트_성공")
    void eraseDiary_success() throws Exception {
        // when
        mockMvc.perform(
                delete("/api/diaries/" + testDiaryId)
                        .header("Authorization", "Bearer " + testToken)
        ).andExpect(status().isCreated());

        // then
        assertThatCode(
                () -> {
                    Diary actual = diaryRepository.findWithDrinksById(testDiaryId).get();

                    assertThat(actual.isDeleted()).isTrue();
                    assertThat(actual.getDrinks()
                                     .stream()
                                     .filter(Drink::isDeleted)
                                     .count())
                            .isEqualTo(actual.getDrinks().size());
                }
        ).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("다이어리 수정 및 삭제 인가_실패")
    void authorizeWriter_fail() throws Exception {
        // given
        String wrongTestToken = jwtUtil.generateToken(PrincipalDetails.builder().memberId(2L).build(), 5000);

        // then
        assertThat(
                mockMvc.perform(
                        delete("/api/diaries/" + testDiaryId)
                                .header("Authorization", "Bearer " + wrongTestToken)
                                .contentType(MediaType.APPLICATION_JSON)
                ).andReturn().getResponse().getStatus()
        ).isEqualTo(403);
    }

}