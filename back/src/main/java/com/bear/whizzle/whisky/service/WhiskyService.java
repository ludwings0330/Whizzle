package com.bear.whizzle.whisky.service;

import com.bear.whizzle.domain.model.type.Flavor;

public interface WhiskyService {

    String test();

    String testException();

    String sleep();

    Flavor getWhiskyFlavorById(long whiskyId);

}
