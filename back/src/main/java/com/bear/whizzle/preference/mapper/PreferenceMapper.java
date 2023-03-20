package com.bear.whizzle.preference.mapper;

import com.bear.whizzle.domain.model.entity.Preference;
import com.bear.whizzle.preference.controller.dto.MemberPreferenceResponseDto;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class PreferenceMapper {

    public static MemberPreferenceResponseDto toMemberPreferenceResponseDto(Preference preference) {
        return MemberPreferenceResponseDto.builder()
                                          .age(preference.getAge())
                                          .gender(preference.getGender())
                                          .flavor(preference.getFlavor())
                                          .priceTier(preference.getPriceTier())
                                          .build();
    }

}
