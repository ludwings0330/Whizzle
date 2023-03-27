package com.bear.whizzle.whisky.repository.projection.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class FlavorSummary {

    private Integer minSmoky;
    private Integer maxSmoky;
    private Integer minPeaty;
    private Integer maxPeaty;
    private Integer minSpicy;
    private Integer maxSpicy;
    private Integer minHerbal;
    private Integer maxHerbal;
    private Integer minOily;
    private Integer maxOily;
    private Integer minBody;
    private Integer maxBody;
    private Integer minRich;
    private Integer maxRich;
    private Integer minSweet;
    private Integer maxSweet;
    private Integer minSalty;
    private Integer maxSalty;
    private Integer minVanilla;
    private Integer maxVanilla;
    private Integer minTart;
    private Integer maxTart;
    private Integer minFruity;
    private Integer maxFruity;
    private Integer minFloral;
    private Integer maxFloral;

}
