package com.bear.whizzle.recommend.controller.dto;

import java.util.List;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PersonalWhiskyCallDto {

    @NotNull
    private Long memberId;
    private List<PreferenceDto> preferenceDtoList;

}
