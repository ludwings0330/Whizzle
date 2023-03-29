package com.bear.whizzle.recommend.controller.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PreferenceDto {

    @NotNull
    private Long memberId;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer priceTier;

    @NotNull
    @Min(0)
    @Max(1)
    private Float smoky;

    @NotNull
    @Min(0)
    @Max(1)
    private Float peaty;

    @NotNull
    @Min(0)
    @Max(1)
    private Float spicy;

    @NotNull
    @Min(0)
    @Max(1)
    private Float herbal;

    @NotNull
    @Min(0)
    @Max(1)
    private Float oily;

    @NotNull
    @Min(0)
    @Max(1)
    private Float body;

    @NotNull
    @Min(0)
    @Max(1)
    private Float rich;

    @NotNull
    @Min(0)
    @Max(1)
    private Float sweet;

    @NotNull
    @Min(0)
    @Max(1)
    private Float salty;

    @NotNull
    @Min(0)
    @Max(1)
    private Float vanilla;

    @NotNull
    @Min(0)
    @Max(1)
    private Float tart;

    @NotNull
    @Min(0)
    @Max(1)
    private Float fruity;

    @NotNull
    @Min(0)
    @Max(1)
    private Float floral;

}
