package com.bear.whizzle.drink.service;

import com.bear.whizzle.domain.model.entity.Diary;
import com.bear.whizzle.domain.model.entity.Drink;
import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.drink.repository.DrinkRepository;
import com.bear.whizzle.whisky.repository.WhiskyRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DrinkServiceImpl implements DrinkService {

    private final WhiskyRepository whiskyRepository;
    private final DrinkRepository drinkRepository;

    @Override
    public void writeDrinks(Diary diary, List<Long> whiskyIds) {
        for (Long whiskyId : whiskyIds) {
            Whisky whisky = whiskyRepository.getReferenceById(whiskyId);

            drinkRepository.findByDiaryAndWhisky(diary, whisky)
                           .ifPresentOrElse(
                                   Drink::toggleDelete,
                                   () -> {
                                       Drink drink = Drink.builder()
                                                          .whisky(whisky)
                                                          .build();

                                       diary.addDrink(drink);
                                   }
                           );
        }
    }

    @Override
    public void eraseDrinks(Diary diary, List<Integer> deletedDrinkOrders) {
        for (Integer index : deletedDrinkOrders) {
            diary.deleteDrink(index);
        }
    }

}
