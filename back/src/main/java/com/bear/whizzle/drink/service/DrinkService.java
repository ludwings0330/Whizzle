package com.bear.whizzle.drink.service;

import com.bear.whizzle.domain.model.entity.Diary;
import java.util.List;

public interface DrinkService {

    void writeDrinks(Diary diary, List<Long> whiskyIds);

    void eraseDrinks(Diary diary, List<Integer> deletedDrinkOrders);

}
