package com.bear.whizzle.learn.controller;

import com.bear.whizzle.learn.controller.dto.MemberData;
import com.bear.whizzle.learn.service.query.LearnService;
import com.bear.whizzle.recommend.service.RecService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
@Slf4j
public class RetrainHandler {

    private final WebClient webClient;
    private final RecService recService;
    private final RetrainService retrainService;
    private final MemberService memberService;

    public void retrainExistedMember(Long memberId) {
        if (!recService.isLearnedMember(memberId).equals(0L)) {
            log.info("학습된 사용자 {} : 실시간 반영 진행", memberId);
            MemberData memberData = retrainService.reactiveLearnData(List.of(memberId));
            webClient.post()
                     .uri("/rec/retrain/exist")
                     .accept(MediaType.APPLICATION_JSON)
                     .contentType(MediaType.APPLICATION_JSON)
                     .bodyValue(memberData)
                     .retrieve() // API 호출
                     .bodyToMono(Void.class)
                     .block();
        }
    }

}
