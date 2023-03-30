package com.bear.whizzle.diary.controller.dto;

import com.bear.whizzle.domain.model.type.DrinkLevel;
import com.bear.whizzle.domain.model.type.Emotion;
import java.time.LocalDate;
import java.util.Set;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class DiaryRequestUpdateDto implements DiaryRequestDto {

    @EqualsAndHashCode.Exclude
    private Long id;

    @NotNull
    private Emotion emotion;

    @NotNull
    private DrinkLevel drinkLevel;

    @NotNull
    private String content;

    @EqualsAndHashCode.Exclude
    private Set<Integer> deletedDrinkOrders;

    @EqualsAndHashCode.Exclude
    private Set<Long> insertedWhiskyIds;

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public LocalDate getDate() {
        return null;
    }

}
