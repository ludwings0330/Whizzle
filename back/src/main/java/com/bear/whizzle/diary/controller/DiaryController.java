package com.bear.whizzle.diary.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.controller.dto.DiaryRequestUpdateDto;
import com.bear.whizzle.diary.service.DiaryService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@Controller
@RequestMapping("/api/diaries")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;

    /**
     * 다이어리 작성 완료 시 상태 코드 201 반환
     *
     * @param member              현재 다이어리를 작성한 본인 계정의 정보
     * @param diaryRequestSaveDto 다이어리 작성에 필요한 데이터
     * @throws DataIntegrityViolationException 다이어리를 작성한 날짜에 이미 작성된 다이어리가 있는 경우에 발생
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void writeDiary(@AuthenticationPrincipal PrincipalDetails member, @Valid DiaryRequestSaveDto diaryRequestSaveDto) {
//        diaryService.writeDiary(member.getId(), diaryRequestSaveDto);
    }

    /**
     * 다이어리 수정 완료 시 상태 코드 202 반환
     *
     * @param member                현재 다이어리를 수정한 본인의 계정 정보
     * @param diaryRequestUpdateDto 다이어리 수정에 필요한 데이터
     * @throws com.bear.whizzle.domain.exception.NotFoundException       잘못된 다이어리 ID를 전달한 경우에 발생
     * @throws org.springframework.security.access.AccessDeniedException 다이어리 작성자와 현재 자신이 다른 경우에 발생
     */
    @PutMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void rewriteDiary(@AuthenticationPrincipal PrincipalDetails member, @Valid DiaryRequestUpdateDto diaryRequestUpdateDto) {
//        diaryService.rewriteDiary(member.getId(), diaryRequestUpdateDto);
    }

    /**
     * 다이어리 삭제 완료 시 상태 코드 202 반환
     *
     * @param member  현재 다이어리를 수정한 본인의 계정 정보
     * @param diaryId 삭제하려는 다이어리의 ID
     * @throws com.bear.whizzle.domain.exception.NotFoundException       잘못된 다이어리 ID를 전달한 경우에 발생
     * @throws org.springframework.security.access.AccessDeniedException 다이어리 작성자와 현재 자신이 다른 경우에 발생
     */
    @DeleteMapping("/{diaryId}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void eraseDiary(@AuthenticationPrincipal PrincipalDetails member, @PathVariable Long diaryId) {
//        diaryService.eraseDiary(member.getId(), diaryId);
    }

}
