package com.bear.whizzle.diary.mapper;

import com.bear.whizzle.diary.controller.dto.DrinkDto;
import com.bear.whizzle.diary.controller.dto.WhiskyNameDto;
import com.bear.whizzle.domain.model.entity.Drink;

public final class DrinkMapper {

    private DrinkMapper() {
    }

    public static DrinkDto toDrinkDto(Drink drink) {
        return DrinkDto.builder()
                       .whisky(new WhiskyNameDto(drink.getWhisky().getId(), drink.getWhisky().getName()))
                       .drinkOrder(drink.getDrinkOrder())
                       .build();
    }

}
