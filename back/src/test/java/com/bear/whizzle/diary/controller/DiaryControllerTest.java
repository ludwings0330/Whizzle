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
import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.controller.dto.DiaryRequestUpdateDto;
import com.bear.whizzle.diary.controller.dto.DiaryResponseDto;
import com.bear.whizzle.diary.controller.dto.DrinkDto;
import com.bear.whizzle.diary.controller.dto.WhiskyNameDto;
import com.bear.whizzle.diary.repository.DiaryRepository;
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
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@Slf4j
@ActiveProfiles("dev")
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
                                                         .whiskyIds(Set.of(1L, 2L, 3L))
                                                         .emotion(Emotion.GOOD)
                                                         .drinkLevel(DrinkLevel.HEAVY)
                                                         .content("feel so good")
                                                         .build();

        // when
        String content = mockMvc.perform(
                                        post("/api/diaries")
                                                .header("Authorization", "Bearer " + testToken)
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content(objectMapper.writeValueAsString(saveDto))
                                ).andExpect(status().isCreated())
                                .andReturn()
                                .getResponse()
                                .getContentAsString();

        // then
        DiaryResponseDto actual = objectMapper.readValue(content, DiaryResponseDto.class);
        assertThat(actual.getDate()).isEqualTo(saveDto.getDate());
        assertThat(actual.getEmotion()).isEqualTo(saveDto.getEmotion());
        assertThat(actual.getDrinkLevel()).isEqualTo(saveDto.getDrinkLevel());
        assertThat(actual.getContent()).isEqualTo(saveDto.getContent());
        assertThat(actual.getDrinks()
                         .stream()
                         .map(DrinkDto::getWhisky)
                         .map(WhiskyNameDto::getId)
                         .collect(Collectors.toSet())).isEqualTo(saveDto.getWhiskyIds());
    }

    @Test
    @DisplayName("다이어리 수정 테스트_성공")
    void rewriteDiary_success() throws Exception {
        // given
        Set<Integer> deletedDrinkOrders = Set.of(0);
        Set<Long> insertedWhiskyIds = Set.of(1L, 4L, 5L);
        DiaryRequestUpdateDto updateDto = DiaryRequestUpdateDto.builder()
                                                               .id(testDiaryId)
                                                               .emotion(Emotion.GOOD)
                                                               .drinkLevel(DrinkLevel.LIGHT)
                                                               .content("normal operation")
                                                               .deletedDrinkOrders(deletedDrinkOrders)
                                                               .insertedWhiskyIds(insertedWhiskyIds)
                                                               .build();

        // when
        String content = mockMvc.perform(
                                        put("/api/diaries/" + testDiaryId)
                                                .header("Authorization", "Bearer " + testToken)
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .content(objectMapper.writeValueAsString(updateDto))
                                ).andExpect(status().isOk())
                                .andReturn()
                                .getResponse()
                                .getContentAsString();

        // then
        DiaryResponseDto actual = objectMapper.readValue(content, DiaryResponseDto.class);
        assertThat(actual.getId()).isEqualTo(updateDto.getId());
        assertThat(actual.getEmotion()).isEqualTo(updateDto.getEmotion());
        assertThat(actual.getDrinkLevel()).isEqualTo(updateDto.getDrinkLevel());
        assertThat(actual.getContent()).isEqualTo(updateDto.getContent());

        assertThatCode(() -> {
            Diary found = diaryRepository.findById(actual.getId()).get();
            assertThat(found.getDrinks()
                            .stream()
                            .filter(Drink::getIsDeleted)
                            .map(Drink::getDrinkOrder)
                            .collect(Collectors.toSet()))
                    .isEqualTo(deletedDrinkOrders);

            assertThat(found.getDrinks()
                            .stream()
                            .filter(Predicate.not(Drink::getIsDeleted))
                            .map(Drink::getWhisky)
                            .map(Whisky::getId)
                            .filter(insertedWhiskyIds::contains)
                            .collect(Collectors.toSet()))
                    .isEqualTo(insertedWhiskyIds);
        }).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("다이어리 삭제 테스트_성공")
    void eraseDiary_success() throws Exception {
        // when
        mockMvc.perform(
                delete("/api/diaries/" + testDiaryId)
                        .header("Authorization", "Bearer " + testToken)
        ).andExpect(status().isOk());

        // then
        assertThatCode(
                () -> {
                    Diary actual = diaryRepository.findWithDrinksById(testDiaryId).get();

                    assertThat(actual.getIsDeleted()).isTrue();
                    assertThat(actual.getDrinks()
                                     .stream()
                                     .filter(Drink::getIsDeleted)
                                     .count())
                            .isEqualTo(actual.getDrinks().size());
                }
        ).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("다이어리 작성 후 삭제 후 작성")
    void writeAndDeleteAndWriteDiary() throws Exception {
        // given
        final long TEST_MEMBER_ID = 1L;
        final String TEST_TOKEN = jwtUtil.generateAccessToken(PrincipalDetails.builder().memberId(TEST_MEMBER_ID).build());
        DiaryRequestSaveDto saveDto = DiaryRequestSaveDto.builder()
                                                         .date(LocalDate.now())
                                                         .whiskyIds(Set.of(1L, 2L, 3L))
                                                         .emotion(Emotion.GOOD)
                                                         .drinkLevel(DrinkLevel.HEAVY)
                                                         .content("기분이 매우매우 조으다.")
                                                         .build();

        // when
        mockMvc.perform(
                post("/api/diaries")
                        .header("Authorization", "Bearer " + TEST_TOKEN)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(saveDto))
        ).andExpect(status().isCreated());

        Diary diary = diaryRepository.findWithDrinksByMemberIdAndDate(TEST_MEMBER_ID, LocalDate.now())
                                     .orElseThrow(() -> new NotFoundException("다이어리 작성 실패"));

        mockMvc.perform(
                delete("/api/diaries/" + diary.getId())
                        .header("Authorization", "Bearer " + TEST_TOKEN)
        ).andExpect(status().isOk());

        // then
        mockMvc.perform(
                post("/api/diaries")
                        .header("Authorization", "Bearer " + TEST_TOKEN)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(saveDto))
        ).andExpect(status().isCreated());
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