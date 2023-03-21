package com.bear.whizzle.diary.service;

import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.controller.dto.DiaryRequestUpdateDto;
import com.bear.whizzle.domain.model.entity.Diary;
import java.util.List;

public interface DiaryService {

    List<Diary> readDiaries(Long memberId, String month);

    void writeDiary(Long memberId, DiaryRequestSaveDto diaryRequestSaveDto);

    void rewriteDiary(Long memberId, DiaryRequestUpdateDto diaryRequestUpdateDto);

    void eraseDiary(Long memberId, Long diaryId);

}
