package com.bear.whizzle.diary;

import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.domain.model.entity.Diary;
import com.bear.whizzle.domain.model.entity.Drink;
import com.bear.whizzle.domain.model.entity.Whisky;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class DiaryMapper {

    public static DiaryRequestSaveDto toDiaryRequestSaveDto(Diary diary) {
        List<Long> whiskyIds = diary.getDrinks()
                                    .stream()
                                    .map(Drink::getWhisky)
                                    .map(Whisky::getId)
                                    .collect(Collectors.toList());

        return DiaryRequestSaveDto.builder()
                                  .whiskyIds(whiskyIds)
                                  .date(diary.getDate())
                                  .emotion(diary.getEmotion())
                                  .drinkLevel(diary.getDrinkLevel())
                                  .content(diary.getContent())
                                  .build();
    }

}
