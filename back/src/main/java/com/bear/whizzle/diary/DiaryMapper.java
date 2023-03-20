package com.bear.whizzle.diary;

import com.bear.whizzle.diary.controller.dto.DiaryRequestDto;
import com.bear.whizzle.diary.controller.dto.DiaryRequestSaveDto;
import com.bear.whizzle.diary.controller.dto.DiaryRequestUpdateDto;
import com.bear.whizzle.domain.model.entity.Diary;
import com.bear.whizzle.domain.model.entity.Drink;
import com.bear.whizzle.domain.model.entity.Member;
import com.bear.whizzle.domain.model.entity.Whisky;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class DiaryMapper {

    public static Diary toDiary(Member member, DiaryRequestDto diaryRequestDto) {
        return Diary.builder()
                    .member(member)
                    .date(diaryRequestDto.getDate())
                    .emotion(diaryRequestDto.getEmotion())
                    .drinkLevel(diaryRequestDto.getDrinkLevel())
                    .content(diaryRequestDto.getContent())
                    .build();
    }

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

    public static DiaryRequestUpdateDto toDiaryRequestUpdateDto(Diary diary) {
        return DiaryRequestUpdateDto.builder()
                                    .id(diary.getId())
                                    .emotion(diary.getEmotion())
                                    .drinkLevel(diary.getDrinkLevel())
                                    .content(diary.getContent())
                                    .build();
    }

}
