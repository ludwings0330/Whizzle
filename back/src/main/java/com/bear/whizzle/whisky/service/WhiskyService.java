package com.bear.whizzle.whisky.service;

import com.bear.whizzle.domain.model.entity.Whisky;
import com.bear.whizzle.domain.model.type.Flavor;

public interface WhiskyService {

    Whisky findWhisky(Long whiskyId);

    Flavor getWhiskyFlavorById(long whiskyId);

    Integer countWhiskies(String word);

}
