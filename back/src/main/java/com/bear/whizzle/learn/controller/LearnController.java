package com.bear.whizzle.learn.controller;

import com.bear.whizzle.learn.service.LearnService;
import com.bear.whizzle.recommend.service.RecService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

@RestController
@RequiredArgsConstructor
@Slf4j
public class LearnController {

    private final WebClient webClient;
    private final RecService recService;
    private final LearnService learnService;

    public void retrainExistedMember(Long memberId) {
        if (!recService.isLearnedMember(memberId).equals(0L)) {
            log.info("학습된 사용자 {} : 실시간 반영 진행", memberId);
            webClient.post()
                     .uri("/rec/retrain/exist")
                     .accept(MediaType.APPLICATION_JSON)
                     .contentType(MediaType.APPLICATION_JSON)
                     .bodyValue(learnService.reactiveLearnMyData(memberId))
                     .retrieve();
        }
    }

}
