package com.bear.whizzle.recommend;

import com.bear.whizzle.domain.model.type.Flavor;
import com.bear.whizzle.recommend.controller.dto.PreferenceDto;
import com.bear.whizzle.whisky.repository.projection.dto.FlavorSummary;

public class PreferenceMapper {

    private PreferenceMapper() {
    }

    public static PreferenceDto toPreferenceDto(Integer priceTier, Flavor flavor, FlavorSummary flavorSummary) {
        return PreferenceDto.builder()
                     .priceTier(priceTier)
                     .body(minmaxNormalize(flavor.getBody(), flavorSummary.getMinBody(), flavorSummary.getMaxBody()))
                     .oily(minmaxNormalize(flavor.getOily(), flavorSummary.getMinOily(), flavorSummary.getMaxOily()))
                     .rich(minmaxNormalize(flavor.getRich(), flavorSummary.getMinRich(), flavorSummary.getMaxRich()))
                     .salty(minmaxNormalize(flavor.getSalty(), flavorSummary.getMinSalty(), flavorSummary.getMaxSalty()))
                     .smoky(minmaxNormalize(flavor.getSmoky(), flavorSummary.getMinSmoky(), flavorSummary.getMaxSmoky()))
                     .spicy(minmaxNormalize(flavor.getSpicy(), flavorSummary.getMinSpicy(), flavorSummary.getMaxSpicy()))
                     .sweet(minmaxNormalize(flavor.getSweet(), flavorSummary.getMinSweet(), flavorSummary.getMaxSweet()))
                     .peaty(minmaxNormalize(flavor.getPeaty(), flavorSummary.getMinPeaty(), flavorSummary.getMaxPeaty()))
                     .fruity(minmaxNormalize(flavor.getFruity(), flavorSummary.getMinFruity(), flavorSummary.getMaxFruity()))
                     .herbal(minmaxNormalize(flavor.getHerbal(), flavorSummary.getMinHerbal(), flavorSummary.getMaxHerbal()))
                     .vanilla(minmaxNormalize(flavor.getVanilla(), flavorSummary.getMinVanilla(), flavorSummary.getMaxVanilla()))
                     .floral(minmaxNormalize(flavor.getFloral(), flavorSummary.getMinFloral(), flavorSummary.getMaxFloral()))
                     .tart(minmaxNormalize(flavor.getTart(), flavorSummary.getMinTart(), flavorSummary.getMaxTart()))
                     .build();
    }

    private static Float minmaxNormalize(Integer score, Integer min, Integer max) {
        min = Math.min(score, min);
        max = Math.max(score, max);
        return ((float) score - min) / (max - min);
    }

}
