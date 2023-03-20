package com.bear.whizzle.preference.service;

import com.bear.whizzle.auth.service.PrincipalDetails;
import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.preference.controller.dto.MemberPreferenceRequestDto;

public interface PreferenceService {

    Preference findByMemberId(Long memberId);

    void updateMemberPreference(PrincipalDetails user, MemberPreferenceRequestDto preference);

}
