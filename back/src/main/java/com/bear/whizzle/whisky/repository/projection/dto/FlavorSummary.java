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

    public static FlavorSummary selectMinMax(FlavorSummary flavorSummary1, FlavorSummary flavorSummary2) {
        return FlavorSummary.builder()
                            .maxBody(Math.max(flavorSummary1.getMaxBody(), flavorSummary2.getMaxBody()))
                            .minBody(Math.min(flavorSummary1.getMinBody(), flavorSummary2.getMinBody()))
                            .maxVanilla(Math.max(flavorSummary1.getMaxVanilla(), flavorSummary2.getMaxVanilla()))
                            .minVanilla(Math.min(flavorSummary1.getMinVanilla(), flavorSummary2.getMinBody()))
                            .maxFloral(Math.max(flavorSummary1.getMaxFloral(), flavorSummary2.getMaxFloral()))
                            .minFloral(Math.min(flavorSummary1.getMinFloral(), flavorSummary2.getMinFloral()))
                            .maxFruity(Math.max(flavorSummary1.getMaxFruity(), flavorSummary2.getMaxFruity()))
                            .minFruity(Math.min(flavorSummary1.getMinFruity(), flavorSummary2.getMinFruity()))
                            .maxOily(Math.max(flavorSummary1.getMaxOily(), flavorSummary2.getMaxOily()))
                            .minOily(Math.min(flavorSummary1.getMinOily(), flavorSummary2.getMinOily()))
                            .maxHerbal(Math.max(flavorSummary1.getMaxHerbal(), flavorSummary2.getMaxHerbal()))
                            .minHerbal(Math.min(flavorSummary1.getMinHerbal(), flavorSummary2.getMinHerbal()))
                            .maxPeaty(Math.max(flavorSummary1.getMaxPeaty(), flavorSummary2.getMaxPeaty()))
                            .minPeaty(Math.min(flavorSummary1.getMinPeaty(), flavorSummary2.getMinPeaty()))
                            .maxRich(Math.max(flavorSummary1.getMaxRich(), flavorSummary2.getMaxRich()))
                            .minRich(Math.min(flavorSummary1.getMinRich(), flavorSummary2.getMinRich()))
                            .maxSalty(Math.max(flavorSummary1.getMaxSalty(), flavorSummary2.getMaxSalty()))
                            .minSalty(Math.min(flavorSummary1.getMinSalty(), flavorSummary2.getMinSalty()))
                            .maxSmoky(Math.max(flavorSummary1.getMaxSmoky(), flavorSummary2.getMaxSmoky()))
                            .minSmoky(Math.min(flavorSummary1.getMinSmoky(), flavorSummary2.getMinSmoky()))
                            .maxSpicy(Math.max(flavorSummary1.getMaxSpicy(), flavorSummary2.getMaxSpicy()))
                            .minSpicy(Math.min(flavorSummary1.getMinSpicy(), flavorSummary2.getMinSpicy()))
                            .maxSweet(Math.max(flavorSummary1.getMaxSweet(), flavorSummary2.getMaxSweet()))
                            .minSweet(Math.min(flavorSummary1.getMinSweet(), flavorSummary2.getMinSweet()))
                            .maxTart(Math.max(flavorSummary1.getMaxTart(), flavorSummary2.getMaxTart()))
                            .minTart(Math.min(flavorSummary1.getMinTart(), flavorSummary2.getMinTart()))
                            .build();
    }

}
