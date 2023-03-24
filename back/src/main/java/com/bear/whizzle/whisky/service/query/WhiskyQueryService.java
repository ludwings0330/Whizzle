package com.bear.whizzle.whisky.service.query;

import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;
import java.util.Map;

public interface WhiskyQueryService {

    FlavorSummary findFlavorMinMax();

    Map<Long, Integer> findWhiskyPriceTier();

}
