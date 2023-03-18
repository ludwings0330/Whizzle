package com.bear.whizzle.diary.service;

import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;

public interface DiaryService {

    void writeDiary(Long memberId, DiaryRequestSaveDto diaryRequestSaveDto);

}
