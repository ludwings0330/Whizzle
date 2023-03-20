package com.bear.whizzle.diary.repository;

import com.bear.whizzle.domain.model.entity.Diary;
import java.util.List;

public interface DiaryCustomRepository {


    List<Diary> findAllByMemberIdAndMonth(Long memberId, String month);

}
