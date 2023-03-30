package com.bear.whizzle.preference.service.query;

import com.bear.whizzle.preference.repository.projection.dto.PreferenceStatisticsDto;

public interface PreferenceQueryService {

    PreferenceStatisticsDto estimateWhiskyTopPreference(Long whiskyId);

}
