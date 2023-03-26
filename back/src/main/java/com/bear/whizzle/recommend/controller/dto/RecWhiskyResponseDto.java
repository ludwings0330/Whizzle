package com.bear.whizzle.recommend.controller.dto;

import java.net.URL;
import javax.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecWhiskyResponseDto {

    @NotNull
    private Long id;
    @NotNull
    private String name;
    private URL url;
    private String category;
    private String location;
    private Integer priceTier;
    private Float abv;
    private Integer reviewCount = 0;
    private Float avgRating = 0f;
    private Boolean keep;

}
