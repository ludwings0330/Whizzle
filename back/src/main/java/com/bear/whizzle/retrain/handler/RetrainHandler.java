package com.bear.whizzle.retrain.handler;

import com.bear.whizzle.retrain.handler.dto.MemberData;
import com.bear.whizzle.retrain.service.query.RetrainQueryService;
import com.bear.whizzle.member.service.MemberService;
import com.bear.whizzle.recommend.service.RecService;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
@Slf4j
public class RetrainHandler {

    private final WebClient webClient;
    private final RecService recService;
    private final RetrainQueryService retrainQueryService;
    private final MemberService memberService;

    public void retrainExistedMember(Long memberId) {
        if (!recService.isLearnedMember(memberId).equals(0L)) {
            log.info("학습된 사용자 {} : 실시간 반영 진행", memberId);
            MemberData memberData = retrainQueryService.reactiveLearnData(List.of(memberId));
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

    @Scheduled(cron = "0 0 3 * * *")
    public void retrainNewMember() {
        MemberData memberData = retrainQueryService.reactiveLearnData(
                memberService.findNewMemberIds()
        );
        LocalDateTime now = LocalDateTime.now();
        if(memberData.getPreferences().isEmpty() && memberData.getRatings().isEmpty()) {
            log.info("신규 사용자 없음 학습 진행하지 않습니다.");
            return;
        }
        memberData.setTime(now.toString());
        log.info("신규 사용자 학습 진행 : {}", memberData);
        webClient.post()
                 .uri("/rec/retrain/new")
                 .accept(MediaType.APPLICATION_JSON)
                 .contentType(MediaType.APPLICATION_JSON)
                 .bodyValue(memberData)
                 .retrieve() // API 호출
                 .bodyToMono(Void.class)
                 .block();
    }
}
