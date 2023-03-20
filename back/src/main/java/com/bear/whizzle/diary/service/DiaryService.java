package com.bear.whizzle.diary.service;

import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.controller.dto.DiaryRequestUpdateDto;

public interface DiaryService {

    void writeDiary(Long memberId, DiaryRequestSaveDto diaryRequestSaveDto);

    void rewriteDiary(Long memberId, DiaryRequestUpdateDto diaryRequestUpdateDto);

    void eraseDiary(Long memberId, Long diaryId);

}
