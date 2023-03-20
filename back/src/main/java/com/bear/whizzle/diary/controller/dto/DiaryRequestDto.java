package com.bear.whizzle.diary.controller.dto;

import com.bear.whizzle.domain.model.type.DrinkLevel;
import com.bear.whizzle.domain.model.type.Emotion;
import java.time.LocalDate;

public interface DiaryRequestDto {

    LocalDate getDate();

    Emotion getEmotion();

    DrinkLevel getDrinkLevel();

    String getContent();

}
