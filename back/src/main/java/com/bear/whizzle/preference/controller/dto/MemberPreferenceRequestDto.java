package com.bear.whizzle.preference.controller.dto;

import com.bear.whizzle.domain.model.type.Age;
import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.domain.model.type.Gender;
import java.util.List;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MemberPreferenceRequestDto {

    @NotNull
    private Gender gender;

    @NotNull
    private Age age;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer priceTier;

    private Flavor flavor;

    private List<Long> whiskies;

}
