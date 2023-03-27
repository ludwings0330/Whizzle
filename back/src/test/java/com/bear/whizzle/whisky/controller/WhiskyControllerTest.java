package com.bear.whizzle.whisky.controller;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.whisky.controller.dto.WhiskyDetailResponseDto;
import com.bear.whizzle.whisky.mapper.WhiskyMapper;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class WhiskyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private WhiskyRepository whiskyRepository;

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

}