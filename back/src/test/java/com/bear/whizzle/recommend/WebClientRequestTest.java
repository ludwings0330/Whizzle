package com.bear.whizzle.recommend;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.common.util.JwtUtil;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyRequestDto;
import com.bear.whizzle.recommend.controller.dto.RecWhiskyResponseDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@Slf4j
class WebClientRequestTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtUtil jwtUtil;

    @Test
    @DisplayName("비로그인 유저 위스키 추천 통합 테스트")
    void recWhiskyAnyTest() throws Exception {
        // given
        Integer priceTier = 4;
        RecWhiskyRequestDto recWhiskyRequestDto = RecWhiskyRequestDto.builder()
                                                                     .whiskies(List.of(65L, 210L, 3214L))
                                                                     .priceTier(priceTier)
                                                                     .build();

        // when
        ObjectMapper objectMapper = new ObjectMapper();
        String content = mockMvc.perform(
                                        post("/api/rec/whisky/any")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .accept(MediaType.APPLICATION_JSON)
                                                .content(objectMapper.writeValueAsString(recWhiskyRequestDto))

                                )
                                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        List<RecWhiskyResponseDto> recWhiskyResponseDtos = objectMapper.readValue(content, new TypeReference<List<RecWhiskyResponseDto>>() {
        });

        // then
        log.debug("result : {}", recWhiskyResponseDtos);
        Assertions.assertThat(recWhiskyResponseDtos).hasSize(9);
        recWhiskyResponseDtos.forEach(w -> {
            Assertions.assertThat(w.getPriceTier()).isEqualTo(priceTier);
        });
    }

    @Test
    @DisplayName("로그인 유저 위스키 추천 통합 테스트")
    void recWhiskyAuthTest() throws Exception {
        // given
        Long testMemberId = 1L;
        String testToken = jwtUtil.generateToken(PrincipalDetails.builder().memberId(testMemberId).build(), 5000);

        Integer priceTier = 2;
        RecWhiskyRequestDto recWhiskyRequestDto = RecWhiskyRequestDto.builder()
                                                                     .flavor(Flavor.builder()
                                                                                   .body(50)
                                                                                   .floral(51)
                                                                                   .salty(15)
                                                                                   .smoky(35)
                                                                                   .spicy(20)
                                                                                   .sweet(0)
                                                                                   .rich(40)
                                                                                   .herbal(10)
                                                                                   .oily(0)
                                                                                   .fruity(30)
                                                                                   .peaty(0)
                                                                                   .tart(0)
                                                                                   .vanilla(80)
                                                                                   .build()
                                                                     )
                                                                     .priceTier(priceTier)
                                                                     .build();

        // when
        ObjectMapper objectMapper = new ObjectMapper();
        String content = mockMvc.perform(
                                        post("/api/rec/whisky/any")
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .accept(MediaType.APPLICATION_JSON)
                                                .content(objectMapper.writeValueAsString(recWhiskyRequestDto))

                                )
                                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        List<RecWhiskyResponseDto> recWhiskyResponseDtos = objectMapper.readValue(content, new TypeReference<List<RecWhiskyResponseDto>>() {
        });

        // then
        log.debug("result : {}", recWhiskyResponseDtos);
        Assertions.assertThat(recWhiskyResponseDtos).hasSize(9);
        recWhiskyResponseDtos.forEach(w -> {
            Assertions.assertThat(w.getPriceTier()).isEqualTo(priceTier);
        });
    }

}
