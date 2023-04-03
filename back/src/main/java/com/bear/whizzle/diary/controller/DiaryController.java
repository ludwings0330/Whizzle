package com.bear.whizzle.diary.controller;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.badge.service.BadgeService;
import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.controller.dto.DiaryRequestUpdateDto;
import com.bear.whizzle.diary.controller.dto.DiaryResponseDto;
import com.bear.whizzle.diary.mapper.DiaryMapper;
import com.bear.whizzle.diary.service.DiaryService;
import com.bear.whizzle.domain.exception.NotFoundException;
import com.bear.whizzle.domain.model.entity.Diary;
import com.bear.whizzle.domain.model.type.Action;
import com.bear.whizzle.memberlevellog.service.MemberLevelLogService;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/diaries")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final BadgeService badgeService;
    private final MemberLevelLogService levelLogService;

    /**
     * 몇 월의 다이어리 목록과 상태 코드 200 반환
     *
     * @param member 현재 본인 계정의 정보
     * @param month  다이어리 목록을 조회하려는 월
     * @return 다이어리 목록
     */
    @GetMapping
    public List<DiaryResponseDto> readDiaries(
            @AuthenticationPrincipal PrincipalDetails member,
            @RequestParam String month
    ) {
        return diaryService.readDiaries(member.getMemberId(), month)
                           .stream()
                           .map(DiaryMapper::toDiaryResponseDto)
                           .collect(Collectors.toList());
    }

    /**
     * 다이어리 작성 완료 시 상태 코드 201 반환
     *
     * @param member              현재 다이어리를 작성한 본인 계정의 정보
     * @param diaryRequestSaveDto 다이어리 작성에 필요한 데이터
     * @return 작성한 다이어리
     * @throws IllegalArgumentException        다이어리를 미리 작성하는 경우에 발생
     * @throws DataIntegrityViolationException 다이어리를 작성한 날짜에 이미 작성된 다이어리가 있는 경우에 발생
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DiaryResponseDto writeDiary(@AuthenticationPrincipal PrincipalDetails member, @Valid @RequestBody DiaryRequestSaveDto diaryRequestSaveDto) {
        if (diaryRequestSaveDto.getDate().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("오늘 이후의 다이어리를 미리 작성할 수 없습니다.");
        }

        Diary diary = diaryService.writeDiary(member.getMemberId(), diaryRequestSaveDto);
        levelLogService.increaseLevelByActivity(member.getMemberId(), Action.DIARY);
        badgeService.awardBadgeOnDiaryCountReached(member.getMemberId());
        return DiaryMapper.toDiaryResponseDto(diary);
    }

    /**
     * 다이어리 수정 완료 시 상태 코드 200 반환
     *
     * @param member                현재 다이어리를 수정한 본인의 계정 정보
     * @param diaryId               수정하려는 다이어리의 ID
     * @param diaryRequestUpdateDto 다이어리 수정에 필요한 데이터
     * @return 수정한 다이어리
     * @throws NotFoundException     잘못된 다이어리 ID를 전달한 경우에 발생
     * @throws AccessDeniedException 다이어리 작성자와 현재 자신이 다른 경우에 발생
     */
    @PutMapping("/{diaryId}")
    public DiaryResponseDto rewriteDiary(
            @AuthenticationPrincipal PrincipalDetails member,
            @PathVariable Long diaryId,
            @Valid @RequestBody DiaryRequestUpdateDto diaryRequestUpdateDto
    ) {
        diaryRequestUpdateDto.setId(diaryId);
        return DiaryMapper.toDiaryResponseDto(
                diaryService.rewriteDiary(member.getMemberId(), diaryRequestUpdateDto)
        );
    }

    /**
     * 다이어리 삭제 완료 시 상태 코드 200 반환
     *
     * @param member  현재 다이어리를 수정한 본인의 계정 정보
     * @param diaryId 삭제하려는 다이어리의 ID
     * @throws NotFoundException     잘못된 다이어리 ID를 전달한 경우에 발생
     * @throws AccessDeniedException 다이어리 작성자와 현재 자신이 다른 경우에 발생
     */
    @DeleteMapping("/{diaryId}")
    public void eraseDiary(@AuthenticationPrincipal PrincipalDetails member, @PathVariable Long diaryId) {
        diaryService.eraseDiary(member.getMemberId(), diaryId);
    }

}
