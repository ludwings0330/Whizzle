package com.bear.whizzle.whisky.controller;

import static org.assertj.core.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.common.util.JwtUtil;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.keep.service.KeepService;
import com.bear.whizzle.preference.repository.projection.dto.PreferenceStatisticsDto;
import com.bear.whizzle.whisky.controller.dto.WhiskyDetailResponseDto;
import com.bear.whizzle.whisky.controller.dto.WhiskySearchCondition;
import com.bear.whizzle.whisky.mapper.WhiskyMapper;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import com.bear.whizzle.whisky.repository.projection.dto.WhiskySimpleResponseDto;
import com.bear.whizzle.whisky.service.query.WhiskyQueryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@ActiveProfiles("dev")
class WhiskyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private WhiskyRepository whiskyRepository;

    @Autowired
    private WhiskyQueryService whiskyQueryService;

    @Autowired
    private KeepService keepService;

    @Test
    @DisplayName("위스키 검색_회원")
    void findWhiskieswithKeep() throws Exception {
        // given
        final Long TEST_MEMBER_ID = 1L;
        final String TEST_TOKEN = jwtUtil.generateAccessToken(PrincipalDetails.builder().memberId(TEST_MEMBER_ID).build());
        final Long TEST_WHISKY_ID = 1L;
        final String TEST_WORD = "HI";
        final String TEST_SIZE = "5";

        // when
        keepService.toggleKeepForWhisky(TEST_MEMBER_ID, TEST_WHISKY_ID);

        mockMvc.perform(
                get("/api/whiskies/any")
                        .header("Authorization", "Bearer " + TEST_TOKEN)
                        .param("word", TEST_WORD)
                        .param("size", TEST_SIZE)
        ).andExpect(status().isOk());

        // then
        Pageable pageable = Pageable.ofSize(Integer.parseInt(TEST_SIZE));
        WhiskySearchCondition searchCondition = WhiskySearchCondition.builder()
                                                                     .word(TEST_WORD)
                                                                     .build();

        Slice<WhiskySimpleResponseDto> actuals = whiskyQueryService.findWhiskiesWithKeep(TEST_MEMBER_ID, pageable, searchCondition);
        assertThat(actuals.stream()
                          .filter(actual -> actual.getName().toUpperCase().contains(TEST_WORD))
                          .count()
        ).isEqualTo(5L);

        assertThat(actuals.stream()
                          .filter(WhiskySimpleResponseDto::getIsKept)
                          .count()
        ).isEqualTo(1L);

    }

    @Test
    @DisplayName("위스키 검색_비회원")
    void findWhiskiesWithoutKeep() throws Exception {
        // given
        final String TEST_WORD = "HI";
        final String TEST_SIZE = "5";

        // when
        mockMvc.perform(
                get("/api/whiskies/any")
                        .param("word", TEST_WORD)
                        .param("size", TEST_SIZE)
        ).andExpect(status().isOk());

        // then
        Pageable pageable = Pageable.ofSize(Integer.parseInt(TEST_SIZE));
        WhiskySearchCondition searchCondition = WhiskySearchCondition.builder()
                                                                     .word(TEST_WORD)
                                                                     .build();

        Slice<WhiskySimpleResponseDto> actuals = whiskyQueryService.findWhiskiesWithoutKeep(pageable, searchCondition);
        assertThat(actuals.stream()
                          .filter(actual -> actual.getName().toUpperCase().contains(TEST_WORD))
                          .count()
        ).isEqualTo(5L);
    }

    @Test
    @DisplayName("위스키 상세 정보 조회")
    void findWhisky() throws Exception {
        // then
        final Long TEST_WHISKY_ID = 1L;

        // when
        String content = mockMvc.perform(
                                        get("/api/whiskies/" + TEST_WHISKY_ID + "/any")
                                ).andExpect(status().isOk())
                                .andReturn()
                                .getResponse()
                                .getContentAsString();

        // then
        assertThatCode(
                () -> {
                    WhiskyDetailResponseDto actual = objectMapper.readValue(content, WhiskyDetailResponseDto.class);
                    Whisky expected = whiskyRepository.findById(TEST_WHISKY_ID).get();
                    assertThat(actual).isEqualTo(WhiskyMapper.toWhiskyDetailResponseDto(expected));
                }
        ).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("특정 위스키 선호 통계 추정")
    void estimateWhiskyTopPreference() throws Exception {
        // given
        final long TEST_WHISKY_ID = 1L;

        // when
        String content = mockMvc.perform(
                                        get("/api/whiskies/" + TEST_WHISKY_ID + "/statistics/any")
                                ).andExpect(status().isOk())
                                .andReturn()
                                .getResponse()
                                .getContentAsString();

        // then
        assertThat(objectMapper.readValue(content, PreferenceStatisticsDto.class)).isNotNull();
    }

    @Test
    @DisplayName("검색된 위스키의 총 개수 조회")
    void countWhiskies() throws Exception {
        // given
        final String TEST_WORD = "Hi";

        // when
        String content = mockMvc.perform(
                                        get("/api/whiskies/count/any")
                                                .param("word", TEST_WORD)
                                ).andExpect(status().isOk())
                                .andReturn()
                                .getResponse()
                                .getContentAsString();

        // then
        int actual = Integer.parseInt(content);
        assertThat(actual).isNotNegative();
    }

}