package com.bear.whizzle.preference.controller.dto;

import com.bear.whizzle.domain.model.type.Age;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.domain.model.type.Gender;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberPreferenceResponseDto {

    private Gender gender;
    private Age age;
    private Integer priceTier;
    private Flavor flavor;

}
