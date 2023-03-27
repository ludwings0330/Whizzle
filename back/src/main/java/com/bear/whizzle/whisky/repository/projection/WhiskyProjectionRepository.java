package com.bear.whizzle.whisky.repository.projection;

import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;

public interface WhiskyProjectionRepository {

    FlavorSummary findFlavorMinMax();

}
