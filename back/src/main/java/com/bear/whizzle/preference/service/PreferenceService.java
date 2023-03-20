package com.bear.whizzle.preference.service;

import com.bear.whizzle.domain.model.entity.Preference;

public interface PreferenceService {

    Preference findByMemberId(Long memberId);

}
