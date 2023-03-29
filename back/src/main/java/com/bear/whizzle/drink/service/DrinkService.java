package com.bear.whizzle.drink.service;

import com.bear.whizzle.domain.model.entity.Diary;
import java.util.Set;

public interface DrinkService {

    void writeDrinks(Diary diary, Set<Long> whiskyIds);

    void eraseDrinks(Diary diary, Set<Integer> deletedDrinkOrders);

}
