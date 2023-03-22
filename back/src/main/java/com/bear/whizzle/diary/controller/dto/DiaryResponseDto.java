package com.bear.whizzle.diary.controller.dto;

import com.bear.whizzle.domain.model.type.DrinkLevel;
import com.bear.whizzle.domain.model.type.Emotion;
import java.time.LocalDate;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
public class DiaryResponseDto {

    private Long id;

    private LocalDate date;

    private Emotion emotion;

    private DrinkLevel drinkLevel;

    private String content;

    private List<DrinkDto> drinks;

}
