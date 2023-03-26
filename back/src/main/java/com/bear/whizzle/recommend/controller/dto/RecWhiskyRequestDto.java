package com.bear.whizzle.recommend.controller.dto;

import com.bear.whizzle.domain.model.type.Flavor;
import java.util.List;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@Builder
@ToString
public class RecWhiskyRequestDto {

    @NotNull
    @Min(1)
    @Max(5)
    private Integer priceTier;
    private List<Long> whiskies;
    private Flavor flavor;

}
