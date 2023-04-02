package com.bear.whizzle.preference.service.query;

import com.bear.whizzle.preference.repository.projection.dto.PreferenceStatisticsDto;
import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;

public interface PreferenceQueryService {

    PreferenceStatisticsDto estimateWhiskyTopPreference(Long whiskyId);

    FlavorSummary findFlavorMinMax();

}
