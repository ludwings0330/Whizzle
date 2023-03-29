package com.bear.whizzle.keep.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.common.util.JwtUtil;
import com.bear.whizzle.keep.controller.dto.KeepSearchCondition;
import com.bear.whizzle.keep.repository.KeepRepository;
import com.bear.whizzle.keep.service.KeepService;
import com.bear.whizzle.keep.service.query.KeepQueryService;
import com.bear.whizzle.whisky.repository.projection.dto.WhiskySimpleResponseDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class KeepControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private KeepService keepService;

    @Autowired
    private KeepQueryService keepQueryService;

    @Autowired
    private KeepRepository keepRepository;

    @Test
    @DisplayName("특정 유저의 킵한 위스키 목록 조회_회원")
    void findKeptWhiskiesWithMyKeep() throws Exception {
        // given
        final Long TEST_MY_ID = 1L;
        final String TEST_TOKEN = jwtUtil.generateAccessToken(PrincipalDetails.builder().memberId(TEST_MY_ID).build());
        final Long TEST_MEMBER_ID = 5L;
        final Long TEST_LAST_OFFSET = 3140L;
        final int TEST_SIZE = 5;

        // when
        mockMvc.perform(
                get("/api/keeps/whiskies/any")
                        .header("Authorization", TEST_TOKEN)
                        .param("memberId", TEST_MEMBER_ID.toString())
                        .param("lastOffset", TEST_LAST_OFFSET.toString())
        ).andExpect(status().isOk());

        // then
        Pageable pageable = Pageable.ofSize(TEST_SIZE);
        KeepSearchCondition searchCondition = KeepSearchCondition.builder()
                                                                 .memberId(TEST_MEMBER_ID)
                                                                 .lastOffset(TEST_LAST_OFFSET)
                                                                 .build();

        Slice<WhiskySimpleResponseDto> actuals = keepQueryService.findKeptWhiskiesWithMyKeep(TEST_MY_ID, pageable, searchCondition);
        assertThat(actuals.getSize()).isEqualTo(TEST_SIZE);
        assertThat(actuals.stream()
                           .filter(WhiskySimpleResponseDto::getIsKept)
                           .count()
        ).isEqualTo(1);
    }

    @Test
    @DisplayName("특정 유저의 킵한 위스키 목록 조회_회원")
    void findKeptWhiskiesWithoutMyKeep() throws Exception {
        // given
        final Long TEST_MEMBER_ID = 1L;
        final int TEST_SIZE = 5;

        // when
        mockMvc.perform(
                get("/api/keeps/whiskies/any")
                        .param("memberId", TEST_MEMBER_ID.toString())
        ).andExpect(status().isOk());

        // then
        Pageable pageable = Pageable.ofSize(TEST_SIZE);
        KeepSearchCondition searchCondition = KeepSearchCondition.builder()
                                                                 .memberId(TEST_MEMBER_ID)
                                                                 .build();

        Slice<WhiskySimpleResponseDto> actuals = keepQueryService.findKeptWhiskiesWithoutMyKeep(pageable, searchCondition);
        assertThat(actuals.getSize()).isEqualTo(TEST_SIZE);
    }

    @Test
    @DisplayName("위스키 킵 여부 확인")
    void keptWhisky() throws Exception {
        // given
        final Long TEST_MEMBER_ID = 1L;
        final String TEST_MEMBER_TOKEN = jwtUtil.generateToken(PrincipalDetails.builder().memberId(TEST_MEMBER_ID).build(), 5000);
        final Long TEST_WHISKY_ID = 1L;

        // when 1
        String content = mockMvc.perform(
                                        get("/api/keeps/" + TEST_WHISKY_ID)
                                                .header("Authorization", "Bearer " + TEST_MEMBER_TOKEN)
                                ).andExpect(status().isOk())
                                .andReturn()
                                .getResponse()
                                .getContentAsString();

        // then 1
        assertThat(content).isEqualTo("false");

        // when 2
        keepService.toggleKeepForWhisky(TEST_MEMBER_ID, TEST_WHISKY_ID);
        content = mockMvc.perform(
                                        get("/api/keeps/" + TEST_WHISKY_ID)
                                                .header("Authorization", "Bearer " + TEST_MEMBER_TOKEN)
                                ).andExpect(status().isOk())
                                .andReturn()
                                .getResponse()
                                .getContentAsString();

        // then 2
        assertThat(content).isEqualTo("true");
    }

    @Test
    @DisplayName("위스키 킵 & 취소 테스트")
    void keepAndUnkeepWhisky() throws Exception {
        // given
        final Long TEST_MEMBER_ID = 1L;
        final String TEST_MEMBER_TOKEN = jwtUtil.generateToken(PrincipalDetails.builder().memberId(TEST_MEMBER_ID).build(), 5000);
        final Long TEST_WHISKY_ID = 1L;

        // when 1
        mockMvc.perform(
                post("/api/keeps/" + TEST_WHISKY_ID)
                        .header("Authorization", "Bearer " + TEST_MEMBER_TOKEN)
        ).andExpect(status().isOk());

        // then 1
        assertThat(keepRepository.findByMemberIdAndWhiskyId(TEST_MEMBER_ID, TEST_WHISKY_ID)).isPresent();

        // when 2
        mockMvc.perform(
                post("/api/keeps/" + TEST_WHISKY_ID)
                        .header("Authorization", "Bearer " + TEST_MEMBER_TOKEN)
        ).andExpect(status().isOk());

        // then 2
        assertThat(keepRepository.findByMemberIdAndWhiskyId(TEST_MEMBER_ID, TEST_WHISKY_ID)).isEmpty();
    }

}