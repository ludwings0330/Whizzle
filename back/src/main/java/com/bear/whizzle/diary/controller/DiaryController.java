package com.bear.whizzle.diary.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping("/api/diaries")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    /**
     * 다이어리 작성 완료 시 응답 코드 201 반환
     * @param member 현재 다이어리를 작성한 본인 계정의 정보
     * @param diaryRequestSaveDto 다이어리 작성에 필요한 데이터
     * @throws DataIntegrityViolationException 다이어리를 작성한 날짜에 이미 작성된 다이어리가 있는 경우에 발생
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void writeDiary(@AuthenticationPrincipal PrincipalDetails member ,DiaryRequestSaveDto diaryRequestSaveDto) {
//        diaryService.writeDiary(member.getId(), diaryRequestSaveDto);
    }

}
