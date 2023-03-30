package com.bear.whizzle.preference.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.bear.whizzle.preference.repository.projection.dto.PreferenceStatisticsDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
class PreferenceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

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
        Assertions.assertThat(objectMapper.readValue(content, PreferenceStatisticsDto.class)).isNotNull();
    }

}